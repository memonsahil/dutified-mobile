import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import useAuthUserStore from '../stores/useAuthUserStore'
import ProjectCard from '../components/projectCard'
import JobCard from '../components/jobCard'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { blue, green, white } from '../theme/colors'
import jobStatus from '../enums/jobStatus'
import screens from '../types/params/screens'

const HomeScreen = () => {
    const { projects, jobs } = useAuthUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>Home</Text>
                    <MaterialCommunityIcons
                        name="android-messages"
                        size={35}
                        color={green}
                        onPress={() => navigation.navigate('Chats')}
                    />
                </View>
                {projects.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            Projects and jobs that you create or join will be
                            shown here.
                        </Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.subHeading}>Active Projects</Text>
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
                                                job.status === jobStatus.TAKEN
                                        ).length
                                    }
                                />
                            ))}
                        </ScrollView>
                        {jobs.length !== 0 ? (
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
                        ) : null}
                    </>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blue,
    },
    scrollView: {
        alignItems: 'center',
        paddingBottom: '20%',
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '20%',
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 40,
        color: white,
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
    },
    noDataText: {
        fontFamily: 'IBMPlexSans-Regular',
        fontSize: 18,
        color: white,
        paddingTop: '10%',
    },
})

export default HomeScreen
