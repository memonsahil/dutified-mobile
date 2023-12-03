import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import JobCard from '../../components/cards/jobCard'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import jobCardProps from '../../components/props/jobCardProps'
import jobStatus from '../../enums/jobStatus'
import categories from '../../enums/categories'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import projectCardProps from '../../components/props/projectCardProps'
import ProjectCard from '../../components/cards/projectCard'

const AttachScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()

    const projectsCreated: Array<projectCardProps> = [
        {
            projectId: '1',
            projectName: 'A very very long project name that will be cut off',
            description: 'This is a description for Hired project 1',
            creationDate: '2021-01-01',
            category: categories.ACCOUNTING,
            showPlus: true,
        },
        {
            projectId: '2',
            projectName: 'Hired Project 2',
            description:
                'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: true,
        },
        {
            projectId: '3',
            projectName: 'Hired Project 3',
            description:
                'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: true,
        },
        {
            projectId: '4',
            projectName: 'Hired Project 4',
            description:
                'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: true,
        },
    ]
    const jobsCreated: Array<jobCardProps> = [
        {
            jobId: '5',
            jobName: 'A very very long job name that will be cut off',
            status: jobStatus.AVAILABLE,
            payment: '100000',
            description:
                'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ACCOUNTING,
            showPlus: true,
        },
        {
            jobId: '6',
            jobName: 'Created Job 2',
            status: jobStatus.IN_PROGRESS,
            payment: '200',
            description: 'This is a description for Created job 2',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: true,
        },
        {
            jobId: '7',
            jobName: 'Created Job 3',
            status: jobStatus.COMPLETED,
            payment: '200',
            description: 'This is a description for Created job 3',
            creationDate: '2021-01-01',
            category: categories.ANIMATION,
            showPlus: true,
        },
    ]

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left-circle"
                            size={30}
                            color={themeColors.YELLOW_GREEN}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Attachment</Text>
                </View>
                {projectsCreated.length === 0 && jobsCreated.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            You have not created any projects or jobs yet.
                        </Text>
                    </View>
                ) : (
                    <>
                        {projectsCreated.length !== 0 ? (
                            <>
                                <Text style={styles.subHeading}>Projects</Text>
                                <ScrollView
                                    contentContainerStyle={
                                        styles.projectsContainer
                                    }
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {projectsCreated.map((project) => (
                                        <ProjectCard
                                            key={project.projectId}
                                            projectId={project.projectId}
                                            projectName={project.projectName}
                                            description={project.description}
                                            creationDate={project.creationDate}
                                            category={project.category}
                                            showPlus={project.showPlus}
                                            additionalStyle={{
                                                width: 350,
                                                marginRight: 20,
                                            }}
                                        />
                                    ))}
                                </ScrollView>
                            </>
                        ) : null}
                        {jobsCreated.length !== 0 ? (
                            <>
                                <Text style={styles.subHeading}>Jobs</Text>
                                {jobsCreated.map((job) => (
                                    <JobCard
                                        key={job.jobId}
                                        jobId={job.jobId}
                                        jobName={job.jobName}
                                        status={job.status}
                                        payment={job.payment}
                                        description={job.description}
                                        creationDate={job.creationDate}
                                        category={job.category}
                                        showPlus={job.showPlus}
                                        additionalStyle={{
                                            marginBottom: '5%',
                                        }}
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
        backgroundColor: themeColors.BLACK,
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
    subHeading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.WHITE,
        marginTop: '5%',
        marginBottom: '5%',
        alignSelf: 'flex-start',
        paddingLeft: '10%',
    },
    projectsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        width: 'auto',
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingTop: '10%',
        paddingBottom: '10%',
        textAlign: 'center',
    },
})

export default AttachScreen
