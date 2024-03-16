import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import JobCard from '../../components/cards/jobCard'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import jobCardProps from '../../components/props/jobCardProps'
import projectCardProps from '../../components/props/projectCardProps'
import ProjectCard from '../../components/cards/projectCard'
import UserCardSmall from '../../components/cards/userCardSmall'
import userCardSmallProps from '../../components/props/userCardSmallProps'
import project from '../../data/classes/project'
import promiseType from '../../data/types/promiseType'
import requestStatus from '../../enums/requestStatus'
import job from '../../data/classes/job'
import user from '../../data/classes/user'
import userType from '../../data/types/userType'
import util from '../../util/util'

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [projects, setProjects] = useState<Array<projectCardProps>>([])
    const [jobs, setJobs] = useState<Array<jobCardProps>>([])
    const [users, setUsers] = useState<Array<userCardSmallProps>>([])
    const [switchCategory, setSwitchCategory] = useState<
        'Projects' | 'Users' | 'Jobs'
    >('Projects')

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        if (searchText !== '') {
            setLoading(true)
            project
                .getProjectResults({ searchQuery: searchText })
                .then((response: promiseType) => {
                    if (
                        response.status === requestStatus.SUCCESS &&
                        response.data
                    ) {
                        setProjects(response.data)
                    } else {
                        setProjects([])
                    }
                })
            job.getJobResults({ searchQuery: searchText }).then(
                (response: promiseType) => {
                    if (
                        response.status === requestStatus.SUCCESS &&
                        response.data
                    ) {
                        setJobs(response.data)
                    } else {
                        setJobs([])
                    }
                }
            )
            user.getUserResults({ searchQuery: searchText }).then(
                (response: promiseType) => {
                    if (
                        response.status === requestStatus.SUCCESS &&
                        response.data
                    ) {
                        const usersData = response.data.map(
                            (user: userType) => ({
                                userId: user.profile?.userId,
                                first: user.profile?.firstName,
                                last: user.profile?.lastName,
                                image: user.profile?.profilePicture,
                                avgRatings: util.avgRating(user.feedbacks),
                            })
                        )
                        setUsers(usersData)
                    } else {
                        setUsers([])
                    }
                }
            )
            setLoading(false)
        }
    }, [searchText])

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left-circle"
                            size={28}
                            color={themeColors.GREEN}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Search</Text>
                </View>
                <TextInput
                    placeholder="App Development"
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.textInput}
                    placeholderTextColor={themeColors.SILVER}
                    inputMode="text"
                />
                {searchText === '' ? (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            Search for projects, jobs, and users by their name
                            or interests.
                        </Text>
                    </View>
                ) : (
                    <>
                        {loading !== true ? (
                            <>
                                <View style={styles.buttonSection}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setSwitchCategory('Projects')
                                        }
                                    >
                                        <Text
                                            style={{
                                                ...styles.button,
                                                color:
                                                    switchCategory ===
                                                    'Projects'
                                                        ? themeColors.GREEN
                                                        : themeColors.SILVER,
                                            }}
                                        >
                                            Projects
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setSwitchCategory('Jobs')
                                        }
                                    >
                                        <Text
                                            style={{
                                                ...styles.button,
                                                color:
                                                    switchCategory === 'Jobs'
                                                        ? themeColors.GREEN
                                                        : themeColors.SILVER,
                                            }}
                                        >
                                            Jobs
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setSwitchCategory('Users')
                                        }
                                    >
                                        <Text
                                            style={{
                                                ...styles.button,
                                                color:
                                                    switchCategory === 'Users'
                                                        ? themeColors.GREEN
                                                        : themeColors.SILVER,
                                            }}
                                        >
                                            Users
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.resultSection}>
                                    {switchCategory === 'Projects' &&
                                    projects.length !== 0 ? (
                                        <>
                                            {projects.map((project) => (
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
                                                    category={project.category}
                                                    showPlus={project.showPlus}
                                                    additionalStyle={{
                                                        width: '90%',
                                                        marginRight: 0,
                                                        marginBottom: '5%',
                                                    }}
                                                />
                                            ))}
                                        </>
                                    ) : switchCategory === 'Projects' &&
                                      projects.length === 0 ? (
                                        <View style={styles.noDataContainer}>
                                            <Text style={styles.noDataText}>
                                                No projects were found.
                                            </Text>
                                        </View>
                                    ) : null}
                                    {switchCategory === 'Jobs' &&
                                    jobs.length !== 0 ? (
                                        <>
                                            {jobs.map((job) => (
                                                <JobCard
                                                    key={job.jobId}
                                                    jobId={job.jobId}
                                                    jobName={job.jobName}
                                                    status={job.status}
                                                    payment={job.payment}
                                                    description={
                                                        job.description
                                                    }
                                                    creationDate={
                                                        job.creationDate
                                                    }
                                                    category={job.category}
                                                    showPlus={job.showPlus}
                                                    additionalStyle={{
                                                        marginBottom: '5%',
                                                    }}
                                                />
                                            ))}
                                        </>
                                    ) : switchCategory === 'Jobs' &&
                                      jobs.length === 0 ? (
                                        <View style={styles.noDataContainer}>
                                            <Text style={styles.noDataText}>
                                                No jobs were found.
                                            </Text>
                                        </View>
                                    ) : null}
                                    {switchCategory === 'Users' &&
                                    users.length !== 0 ? (
                                        <>
                                            {users.map((user) => (
                                                <UserCardSmall
                                                    key={user.userId}
                                                    userId={user.userId}
                                                    first={user.first}
                                                    last={user.last}
                                                    image={user.image}
                                                    avgRatings={user.avgRatings}
                                                />
                                            ))}
                                        </>
                                    ) : switchCategory === 'Users' &&
                                      users.length === 0 ? (
                                        <View style={styles.noDataContainer}>
                                            <Text style={styles.noDataText}>
                                                No users were found.
                                            </Text>
                                        </View>
                                    ) : null}
                                </View>
                            </>
                        ) : (
                            <View style={styles.loadingContainer}>
                                <Progress.Bar
                                    width={250}
                                    height={25}
                                    borderRadius={20}
                                    indeterminate={true}
                                    color={themeColors.GREEN}
                                />
                            </View>
                        )}
                    </>
                )}
            </KeyboardAwareScrollView>
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
        alignItems: 'center',
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
    textInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '80%',
        paddingTop: '5%',
        marginBottom: '5%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 1,
        alignSelf: 'center',
    },
    buttonSection: {
        flexDirection: 'row',
        width: '70%',
        justifyContent: 'space-between',
        marginBottom: '5%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
    },
    resultSection: {
        width: '100%',
        paddingBottom: '20%',
        alignItems: 'center',
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingTop: '5%',
        textAlign: 'center',
    },
})

export default SearchScreen
