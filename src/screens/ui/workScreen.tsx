import { useState } from 'react'
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
import selection from '../../enums/selections'
import authStore from '../../state/stores/authStore'

const WorkScreen = () => {
    const [switchColumn, setSwitchColumn] = useState<'Hired' | 'Created'>(
        'Hired'
    )

    const currentUser = authStore((state) => state.currentUser)

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>Work</Text>
                    <View style={styles.iconWrapper}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Create')}
                        >
                            <MaterialCommunityIcons
                                name="briefcase-plus"
                                size={28}
                                color={themeColors.GREEN}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Search')}
                        >
                            <MaterialCommunityIcons
                                name="magnify"
                                size={28}
                                color={themeColors.GREEN}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonSection}>
                    <TouchableOpacity onPress={() => setSwitchColumn('Hired')}>
                        <Text
                            style={{
                                ...styles.button,
                                color:
                                    switchColumn === 'Hired'
                                        ? themeColors.GREEN
                                        : themeColors.SILVER,
                            }}
                        >
                            Hired
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSwitchColumn('Created')}
                    >
                        <Text
                            style={{
                                ...styles.button,
                                color:
                                    switchColumn === 'Created'
                                        ? themeColors.GREEN
                                        : themeColors.SILVER,
                            }}
                        >
                            Created
                        </Text>
                    </TouchableOpacity>
                </View>
                {switchColumn === 'Hired' ? (
                    <>
                        {currentUser?.projectsWorked.length === 0 &&
                        currentUser?.jobsWorked.length === 0 ? (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    Projects and jobs that you are hired for
                                    will be shown here.
                                </Text>
                            </View>
                        ) : (
                            <>
                                {currentUser?.projectsWorked.length !== 0 ? (
                                    <>
                                        <Text style={styles.subHeading}>
                                            Projects
                                        </Text>
                                        <ScrollView
                                            contentContainerStyle={
                                                styles.projectsContainer
                                            }
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={
                                                false
                                            }
                                            pagingEnabled={true}
                                            decelerationRate="fast"
                                            snapToInterval={370}
                                        >
                                            {currentUser?.projectsWorked.map(
                                                (project) => (
                                                    <ProjectCard
                                                        key={project.projectId}
                                                        projectId={
                                                            project.projectId
                                                        }
                                                        projectName={
                                                            project.projectName
                                                        }
                                                        description={
                                                            project.description
                                                        }
                                                        creationDate={
                                                            project.creationDate
                                                        }
                                                        category={
                                                            project.category
                                                        }
                                                        showPlus={false}
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
                                {currentUser?.jobsWorked.length !== 0 ? (
                                    <>
                                        <Text style={styles.subHeading}>
                                            Jobs
                                        </Text>
                                        {currentUser?.jobsWorked.map((job) => (
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
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {currentUser?.projectsCreated.length === 0 &&
                        currentUser?.jobsCreated.length === 0 ? (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    Projects and jobs that you create will be
                                    shown here.
                                </Text>
                            </View>
                        ) : (
                            <>
                                {currentUser?.projectsCreated.length !== 0 ? (
                                    <>
                                        <Text style={styles.subHeading}>
                                            Projects
                                        </Text>
                                        <ScrollView
                                            contentContainerStyle={
                                                styles.projectsContainer
                                            }
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={
                                                false
                                            }
                                            pagingEnabled={true}
                                            decelerationRate="fast"
                                            snapToInterval={370}
                                        >
                                            {currentUser?.projectsCreated.map(
                                                (project) => (
                                                    <ProjectCard
                                                        key={project.projectId}
                                                        projectId={
                                                            project.projectId
                                                        }
                                                        projectName={
                                                            project.projectName
                                                        }
                                                        description={
                                                            project.description
                                                        }
                                                        creationDate={
                                                            project.creationDate
                                                        }
                                                        category={
                                                            project.category
                                                        }
                                                        showPlus={false}
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
                                        <Text style={styles.subHeading}>
                                            Jobs
                                        </Text>
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
                                                showPlus={selection.HIDE}
                                                additionalStyle={{
                                                    marginBottom: '5%',
                                                }}
                                            />
                                        ))}
                                    </>
                                ) : null}
                            </>
                        )}
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
        justifyContent: 'space-between',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
        justifyContent: 'space-between',
    },
    buttonSection: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between',
        paddingTop: '5%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
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

export default WorkScreen
