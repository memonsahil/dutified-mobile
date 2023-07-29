import { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View, Alert } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import useUserStore from '../stores/useUserStore'
import * as Progress from 'react-native-progress'
import UserCard from '../components/userCard'
import ProjectCard from '../components/projectCard'
import JobCard from '../components/jobCard'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { blue, green, white } from '../theme/colors'
import jobStatus from '../enums/jobStatus'
import screens from '../types/params/screens'
import userScreenProps from '../types/props/screens/userScreenProps'

const UserScreen = ({ route }: userScreenProps) => {
    const { userId } = route.params

    const [first, setFirst] = useState<string>('')
    const [last, setLast] = useState<string>('')
    const [imageSrc, setImageSrc] = useState<string>('')
    const [projects, setProjects] = useState<
        {
            projectId: string
            projectName: string
            projectCreatorId: string
            projectCreator: string
            category: string
            projectDesc: string
        }[]
    >([])
    const [jobs, setJobs] = useState<
        {
            jobId: string
            jobName: string
            projectId: string
            projectName: string
            jobCreatorId: string
            jobCreator: string
            jobWorkerId: string
            jobWorker: string
            payment: string
            status: string
            deadline: string
            jobDesc: string
        }[]
    >([])
    const [loading, setLoading] = useState<boolean>(true)

    const { getUserData } = useUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        getUserData(userId)
            .then((result) => {
                setFirst(result.data?.userDetails.firstName!)
                setLast(result.data?.userDetails.lastName!)
                setImageSrc(result.data?.userDetails.imageSrc!)
                setProjects(result.data?.projects!)
                setJobs(result.data?.jobs!)

                setLoading(false)
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
    }, [userId])

    return (
        <View style={styles.container}>
            {loading === false ? (
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.headerSection}>
                        <View style={styles.headingRegion}>
                            <AntDesign
                                name="caretleft"
                                size={30}
                                color={green}
                                onPress={() => navigation.goBack()}
                            />
                            <Text style={styles.heading}>Profile</Text>
                        </View>
                        <FontAwesome5
                            name="grin-stars"
                            size={30}
                            color={green}
                        />
                    </View>
                    <UserCard first={first} last={last} image={imageSrc} />
                    {projects.length === 0 ? (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataHeading}>
                                No Active Projects
                            </Text>
                            <Text style={styles.noDataText}>
                                `${first} ${last} has not created or joined any
                                projects yet.`
                            </Text>
                        </View>
                    ) : (
                        <>
                            <Text style={styles.subHeading}>
                                Active Projects
                            </Text>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.horizontalSection}
                            >
                                {projects.map((project) => (
                                    <ProjectCard
                                        key={project.projectId}
                                        nav={navigation}
                                        projectId={project.projectId}
                                        projectName={project.projectName}
                                        category={project.category}
                                        projectDesc={project.projectDesc}
                                        projectCreator={project.projectCreator}
                                        availableJobs={
                                            jobs.filter(
                                                (job) =>
                                                    job.projectId ===
                                                        project.projectId &&
                                                    job.status ===
                                                        jobStatus.AVAILABLE
                                            ).length
                                        }
                                        takenJobs={
                                            jobs.filter(
                                                (job) =>
                                                    job.projectId ===
                                                        project.projectId &&
                                                    job.status ===
                                                        jobStatus.TAKEN
                                            ).length
                                        }
                                    />
                                ))}
                            </ScrollView>
                            {jobs.length === 0 ? (
                                <View style={styles.noDataContainer}>
                                    <Text style={styles.noDataHeading}>
                                        No Active Jobs
                                    </Text>
                                    <Text style={styles.noDataText}>
                                        `${first} ${last} has not created or
                                        taken up any jobs yet.`
                                    </Text>
                                </View>
                            ) : (
                                <>
                                    <Text style={styles.subHeading}>
                                        Active Jobs
                                    </Text>
                                    {jobs.map((job) => (
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
                                    ))}
                                </>
                            )}
                        </>
                    )}
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
        alignItems: 'center',
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
        justifyContent: 'space-between',
    },
    headingRegion: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 30,
        color: white,
        paddingLeft: 20,
    },
    subHeading: {
        alignSelf: 'flex-start',
        paddingLeft: 30,
        paddingTop: 20,
        marginBottom: 20,
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 30,
        color: white,
    },
    horizontalSection: {
        paddingRight: 25,
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
        paddingTop: 20,
    },
    noDataHeading: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 30,
        color: white,
    },
    noDataText: {
        fontFamily: 'IBMPlexSans-Regular',
        fontSize: 18,
        color: white,
        paddingTop: '5%',
    },
})

export default UserScreen
