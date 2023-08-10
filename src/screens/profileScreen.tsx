import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import useAuthStore from '../stores/useAuthUserStore'
import { FontAwesome5 } from '@expo/vector-icons'
import UserCard from '../components/userCard'
import ProjectCard from '../components/projectCard'
import JobCard from '../components/jobCard'
import { blue, green, white } from '../theme/colors'
import jobStatus from '../enums/jobStatus'
import screens from '../types/params/screens'

const ProfileScreen = () => {
    const { userDetails, projects, jobs } = useAuthStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>Profile</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Feedback')}
                    >
                        <FontAwesome5
                            name="grin-stars"
                            size={30}
                            color={green}
                        />
                    </TouchableOpacity>
                </View>
                <UserCard
                    first={userDetails.firstName}
                    last={userDetails.lastName}
                    image={userDetails.imageSrc}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddProject')}
                >
                    <Text style={styles.button}>Add Project</Text>
                </TouchableOpacity>
                {projects.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            Projects and jobs that you create or join will be
                            shown here.
                        </Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.subHeading}>Projects</Text>
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
                                <Text style={styles.subHeading}>Jobs</Text>
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
        justifyContent: 'space-between',
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
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 40,
        color: white,
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 25,
        color: green,
        paddingTop: '10%',
    },
    subHeading: {
        alignSelf: 'flex-start',
        paddingLeft: 30,
        paddingTop: 20,
        marginBottom: 20,
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
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
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 18,
        color: white,
        paddingTop: '10%',
    },
})

export default ProfileScreen
