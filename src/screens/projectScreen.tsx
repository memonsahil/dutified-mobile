import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import JobCard from '../components/jobCard'
import useProjectStore from '../stores/useProjectStore'
import useJobStore from '../stores/useJobStore'
import useAuthStore from '../stores/useAuthUserStore'
import * as Progress from 'react-native-progress'
import { AntDesign } from '@expo/vector-icons'
import { black, blue, green, white } from '../theme/colors'
import jobState from '../interfaces/state/jobState'
import jobStatus from '../enums/jobStatus'
import screens from '../types/params/screens'
import projectScreenProps from '../types/props/screens/projectScreenProps'

const ProjectScreen = ({ route }: projectScreenProps) => {
    const { projectId } = route.params

    const [projectName, setProjectName] = useState<string>('')
    const [projectCategory, setProjectCategory] = useState<string>('')
    const [projectDesc, setProjectDesc] = useState<string>('')
    const [projectCreatorId, setProjectCreatorId] = useState<string>('')
    const [projectCreator, setProjectCreator] = useState<string>('')
    const [jobs, setJobs] = useState<jobState[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const { getProject } = useProjectStore((state) => state)
    const { getProjectJobs } = useJobStore((state) => state)
    const { userDetails } = useAuthStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        getProject(projectId)
            .then((result) => {
                setProjectName(result.data?.projectName!)
                setProjectCategory(result.data?.category!)
                setProjectDesc(result.data?.projectDesc!)
                setProjectCreatorId(result.data?.projectCreatorId!)
                setProjectCreator(result.data?.projectCreator!)

                getProjectJobs(result.data?.projectId!).then((result) => {
                    setJobs(result.data!)

                    setLoading(false)
                })
            })
            .catch(() => {
                Alert.alert(
                    'Error Occurred',
                    'An error occurred, please try again or contact our support team.',
                    [
                        {
                            text: 'Dismiss',
                            onPress: () => {
                                navigation.goBack()
                            },
                        },
                    ]
                )
            })
    }, [projectId])

    const availableJobs = jobs
        ? jobs.filter((job) => job.status === jobStatus.AVAILABLE).length
        : 0
    const takenJobs = jobs
        ? jobs.filter((job) => job.status === jobStatus.TAKEN).length
        : 0

    return (
        <View style={styles.container}>
            {loading === false ? (
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.headerSection}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign
                                name="caretleft"
                                size={30}
                                color={green}
                            />
                        </TouchableOpacity>
                        <Text
                            style={styles.heading}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {projectName}
                        </Text>
                    </View>
                    <View style={styles.infoSection}>
                        <View>
                            <Text style={styles.info}>{projectCategory}</Text>
                        </View>
                        <View style={styles.jobsSection}>
                            {availableJobs !== 0 || takenJobs !== 0 ? (
                                <>
                                    {availableJobs !== 0 ? (
                                        <Text style={styles.info}>
                                            {availableJobs} Available
                                        </Text>
                                    ) : null}
                                    {takenJobs !== 0 ? (
                                        <Text style={styles.info}>
                                            {takenJobs} Taken
                                        </Text>
                                    ) : null}
                                </>
                            ) : (
                                <Text style={styles.info}>No Jobs</Text>
                            )}
                        </View>
                    </View>
                    <Text style={styles.projectDesc}>{projectDesc}</Text>
                    {projectCreator ===
                    `${userDetails.firstName} ${userDetails.lastName}` ? null : (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('User', {
                                    userId: projectCreatorId,
                                })
                            }
                        >
                            <Text
                                style={styles.button}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {projectCreator}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {projectCreator ===
                    `${userDetails.firstName} ${userDetails.lastName}` ? (
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() =>
                                navigation.navigate('AddJob', {
                                    projectId: projectId,
                                    projectName: projectName,
                                    jobCreatorId: projectCreatorId,
                                    jobCreator: projectCreator,
                                })
                            }
                        >
                            <Text style={styles.sectionButton}>ADD JOB</Text>
                        </TouchableOpacity>
                    ) : null}
                    {projectCreator !==
                    `${userDetails.firstName} ${userDetails.lastName}` ? (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Chat', {
                                        receiverUserId: projectCreatorId,
                                    })
                                }
                            >
                                <Text style={styles.sectionButton}>Chat</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                    <View style={styles.jobsList}>
                        {jobs.length !== 0
                            ? jobs.map((job) => (
                                  <JobCard
                                      key={job.jobId}
                                      nav={navigation}
                                      jobId={job.jobId}
                                      jobName={job.jobName}
                                      status={job.status}
                                      payment={job.payment}
                                      jobDesc={job.jobDesc}
                                      deadline={job.deadline}
                                  />
                              ))
                            : null}
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={green}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blue,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'flex-start',
        paddingBottom: '20%',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 28,
        color: white,
        paddingLeft: 20,
        paddingRight: 30,
    },
    infoSection: {
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
    },
    info: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 15,
        color: black,
        backgroundColor: green,
        marginRight: 10,
        padding: 5,
    },
    jobsSection: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    projectDesc: {
        fontFamily: 'IBMPlexSans-Regular',
        fontSize: 18,
        color: white,
        width: '80%',
        paddingBottom: 20,
        alignSelf: 'center',
    },
    buttonContainer: {
        alignSelf: 'center',
        paddingBottom: '5%',
    },
    button: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 25,
        color: green,
        paddingLeft: 30,
        paddingBottom: 20,
    },
    sectionButton: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 25,
        color: green,
        paddingBottom: 20,
    },
    jobsList: {
        width: '100%',
        alignItems: 'center',
    },
})

export default ProjectScreen
