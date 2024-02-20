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
import * as Progress from 'react-native-progress'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import projectScreenProps from '../props/projectScreenProps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import JobCard from '../../components/cards/jobCard'
import project from '../../data/classes/project'
import promiseType from '../../data/types/promiseType'
import requestStatus from '../../enums/requestStatus'
import authStore from '../../state/stores/authStore'
import jobType from '../../data/types/jobType'
import selection from '../../enums/selection'

const ProjectScreen = ({ route }: projectScreenProps) => {
    const { projectId } = route.params

    const [projectName, setProjectName] = useState<string>('')
    const [projectCreatorId, setProjectCreatorId] = useState<string>('')
    const [projectCreator, setProjectCreator] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [creationDate, setCreationDate] = useState<Date>()
    const [projectDesc, setProjectDesc] = useState<string>('')
    const [jobs, setJobs] = useState<Array<jobType>>([])
    const [loading, setLoading] = useState<boolean>(true)

    const currentUser = authStore((state) => state.currentUser)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        project
            .getProject({ projectId: projectId })
            .then((response: promiseType) => {
                if (
                    response.status === requestStatus.SUCCESS &&
                    response.data
                ) {
                    setProjectName(response.data.projectName)
                    setProjectCreatorId(response.data.projectCreatorId)
                    setProjectCreator(response.data.projectCreator)
                    setCategory(response.data.category)
                    setCreationDate(response.data.creationDate)
                    setProjectDesc(response.data.description)
                    setJobs(response.data.jobs)
                    setLoading(false)
                } else {
                    Alert.alert(
                        'Error Occurred',
                        'Please contact our support team.',
                        [
                            {
                                text: 'Dismiss',
                                onPress: () => {},
                            },
                        ]
                    )
                }
            })
    }, [projectId])

    return (
        <View style={styles.container}>
            {loading === false ? (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.headerSection}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                                name="chevron-left-circle"
                                size={26}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Project</Text>
                    </View>
                    <Text style={styles.detail}>{projectName}</Text>
                    <Text style={styles.detail}>
                        {creationDate?.toString()}
                    </Text>
                    <View style={styles.detailSection}>
                        <Text style={styles.projectDetail}>{category}</Text>
                    </View>
                    <Text style={styles.projectDesc}>{projectDesc}</Text>
                    {projectCreatorId === currentUser?.profile.userId ? null : (
                        <>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('User', {
                                        userId: projectCreatorId,
                                    })
                                }
                            >
                                <Text style={styles.infoButton}>
                                    {projectCreator}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Chat', {
                                        userId: projectCreatorId,
                                    })
                                }
                                style={styles.chatButtonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="message-text"
                                    size={26}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.chatButton}>Chat</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    <View style={styles.jobList}>
                        {jobs.length !== 0 ? (
                            <>
                                {jobs.map((job) => (
                                    <JobCard
                                        key={job.jobId}
                                        jobId={job.jobId}
                                        jobName={job.jobName}
                                        status={job.status}
                                        payment={job.payment}
                                        description={job.description}
                                        creationDate={job.creationDate}
                                        category={job.category}
                                        showPlus={selection.HIDE}
                                        additionalStyle={{
                                            marginBottom: '5%',
                                        }}
                                    />
                                ))}
                            </>
                        ) : null}
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={themeColors.YELLOW_GREEN}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.BLACK,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'flex-start',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: '10%',
        paddingRight: '10%',
        width: '100%',
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
        paddingLeft: '5%',
    },
    detail: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingHorizontal: '10%',
        paddingTop: '5%',
    },
    detailSection: {
        flexDirection: 'row',
        marginLeft: '10%',
        marginTop: '5%',
    },
    projectDetail: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.YELLOW_GREEN,
        padding: '1%',
        marginRight: '5%',
    },
    infoButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.YELLOW_GREEN,
        marginHorizontal: '10%',
        marginTop: '5%',
    },
    projectDesc: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        width: '80%',
        alignSelf: 'center',
        paddingTop: '5%',
    },
    chatButtonWrapper: {
        alignItems: 'center',
        marginTop: '5%',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    chatButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
    },
    buttonIcon: {
        marginRight: '3%',
    },
    jobList: {
        width: '100%',
        paddingBottom: '20%',
        paddingTop: '5%',
        alignItems: 'center',
    },
})

export default ProjectScreen
