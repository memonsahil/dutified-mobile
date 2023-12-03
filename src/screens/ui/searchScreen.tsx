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
import categories from '../../enums/categories'
import jobStatus from '../../enums/jobStatus'

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [switchCategory, setSwitchCategory] = useState<
        'Projects' | 'Users' | 'Jobs'
    >('Projects')

    const navigation: NavigationProp<screens> = useNavigation()
    const projects: Array<projectCardProps> = [
        {
            projectId: '1',
            projectName:
                'A very very very long project name that will be cut off',
            description: 'This is a description for Hired project 1',
            creationDate: '2021-01-01',
            category: categories.ACCOUNTING,
            showPlus: false,
        },
        {
            projectId: '2',
            projectName: 'Hired Project 2',
            description:
                'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: false,
        },
        {
            projectId: '3',
            projectName: 'Hired Project 3',
            description:
                'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: false,
        },
        {
            projectId: '4',
            projectName: 'Hired Project 4',
            description:
                'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: false,
        },
    ]
    const jobs: Array<jobCardProps> = [
        {
            jobId: '1',
            jobName: 'A very very very long job name that will be cut off',
            status: jobStatus.AVAILABLE,
            payment: '100000',
            description:
                'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ACCOUNTING,
            showPlus: false,
        },
        {
            jobId: '2',
            jobName: 'Created Job 2',
            status: jobStatus.IN_PROGRESS,
            payment: '200',
            description: 'This is a description for Created job 2',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: false,
        },
        {
            jobId: '3',
            jobName: 'Created Job 3',
            status: jobStatus.COMPLETED,
            payment: '200',
            description: 'This is a description for Created job 3',
            creationDate: '2021-01-01',
            category: categories.ANIMATION,
            showPlus: false,
        },
    ]
    const users: Array<userCardSmallProps> = [
        {
            userId: '1',
            first: 'Sahil',
            last: 'A very long last name that will be cut off',
            image: '',
            affiliation: {
                orgName: 'University of Toronto',
                userTitle: 'Student',
            },
            avgRatings: '4.5',
        },
        {
            userId: '2',
            first: 'Sahil',
            last: 'Memon',
            image: '',
            avgRatings: '4.5',
        },
        {
            userId: '3',
            first: 'Sahil',
            last: 'Memon',
            image: '',
            avgRatings: '4.5',
        },
        {
            userId: '4',
            first: 'Sahil',
            last: 'Memon',
            image: '',
            affiliation: {
                orgName: 'University of Toronto',
                userTitle: 'Student',
            },
            avgRatings: '4.5',
        },
    ]

    useEffect(() => {
        if (searchText !== '') {
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
                            size={30}
                            color={themeColors.YELLOW_GREEN}
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
                            Search for projects, jobs and users by their title,
                            name or category.
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
                                                        ? themeColors.YELLOW_GREEN
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
                                                        ? themeColors.YELLOW_GREEN
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
                                                        ? themeColors.YELLOW_GREEN
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
                                      projects.length === 0 ? (
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
                                                    affiliation={
                                                        user.affiliation
                                                    }
                                                    avgRatings={user.avgRatings}
                                                />
                                            ))}
                                        </>
                                    ) : switchCategory === 'Users' &&
                                      projects.length === 0 ? (
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
                                    color={themeColors.YELLOW_GREEN}
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
        borderBottomWidth: 3,
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
