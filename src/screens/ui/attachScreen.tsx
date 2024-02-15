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
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ProjectCard from '../../components/cards/projectCard'
import authStore from '../../state/stores/authStore'
import selection from '../../enums/selection'

const AttachScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()

    const currentUser = authStore((state) => state.currentUser)

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left-circle"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Attachment</Text>
                </View>
                {currentUser?.projectsCreated.length === 0 &&
                currentUser?.jobsCreated.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            You have not created any projects or jobs yet.
                        </Text>
                    </View>
                ) : (
                    <>
                        {currentUser?.projectsCreated.length !== 0 ? (
                            <>
                                <Text style={styles.subHeading}>Projects</Text>
                                <ScrollView
                                    contentContainerStyle={
                                        styles.projectsContainer
                                    }
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    pagingEnabled={true}
                                    decelerationRate="fast"
                                    snapToInterval={370}
                                >
                                    {currentUser?.projectsCreated.map(
                                        (project) => (
                                            <ProjectCard
                                                key={project.projectId}
                                                projectId={project.projectId}
                                                projectName={
                                                    project.projectName
                                                }
                                                description={
                                                    project.description
                                                }
                                                creationDate={
                                                    project.creationDate
                                                }
                                                category={project.category}
                                                showPlus={true}
                                                additionalStyle={{
                                                    width: 350,
                                                    marginRight: 20,
                                                }}
                                            />
                                        )
                                    )}
                                </ScrollView>
                            </>
                        ) : null}
                        {currentUser?.jobsCreated.length !== 0 ? (
                            <>
                                <Text style={styles.subHeading}>Jobs</Text>
                                {currentUser?.jobsCreated.map((job) => (
                                    <JobCard
                                        key={job.jobId}
                                        jobId={job.jobId}
                                        jobName={job.jobName}
                                        status={job.status}
                                        payment={job.payment}
                                        description={job.description}
                                        creationDate={job.creationDate}
                                        category={job.category}
                                        showPlus={selection.ATTACHMENT}
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
