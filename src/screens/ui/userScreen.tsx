import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import UserCard from '../../components/cards/userCard'
import JobCard from '../../components/cards/jobCard'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import UserDetailsCard from '../../components/cards/userDetailsCard'
import categories from '../../enums/categories'
import { useState } from 'react'
import jobCardProps from '../../components/props/jobCardProps'
import jobStatus from '../../enums/jobStatus'
import PostCard from '../../components/cards/postCard'
import postCardProps from '../../components/props/postCardProps'
import projectCardProps from '../../components/props/projectCardProps'
import ProjectCard from '../../components/cards/projectCard'
import attachment from '../../enums/attachment'
import selection from '../../enums/selection'

const UserScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()
    const [switchColumn, setSwitchColumn] = useState<
        'Details' | 'Posts' | 'Hired' | 'Created'
    >('Details')
    const posts: Array<postCardProps> = [
        {
            postId: '1',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            userId: '1',
            userName: 'Sahil Memon',
            userAvatar: '',
            date: '2021-01-01',
            attachments: [
                {
                    id: '1',
                    title: 'Created Job 1',
                    type: attachment.JOB,
                },
                {
                    id: '2',
                    title: 'Created Project 1',
                    type: attachment.PROJECT,
                },
            ],
            comments: '1',
        },
        {
            postId: '2',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            userId: '1',
            userName: 'Sahil Memon',
            userAvatar: '',
            date: '2021-01-01',
            attachments: [
                {
                    id: '1',
                    title: 'Created Job 1',
                    type: attachment.JOB,
                },
                {
                    id: '2',
                    title: 'Created Job 2',
                    type: attachment.JOB,
                },
            ],
            comments: '1',
        },
        {
            postId: '3',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            userId: '1',
            userName: 'Sahil Memon',
            userAvatar: '',
            date: '2021-01-01',
            attachments: [],
            comments: '1',
        },
    ]
    const projectsHired: Array<projectCardProps> = [
        {
            projectId: '1',
            projectName: 'Hired Project 1',
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
    ]
    const jobsHired: Array<jobCardProps> = [
        {
            jobId: '1',
            jobName: 'Created Job 1',
            status: jobStatus.AVAILABLE,
            payment: '100000',
            description:
                'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ACCOUNTING,
            showPlus: selection.NONE,
        },
        {
            jobId: '2',
            jobName: 'Created Job 2',
            status: jobStatus.IN_PROGRESS,
            payment: '200',
            description: 'This is a description for Created job 2',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: selection.NONE,
        },
        {
            jobId: '3',
            jobName: 'Created Job 3',
            status: jobStatus.COMPLETED,
            payment: '200',
            description: 'This is a description for Created job 3',
            creationDate: '2021-01-01',
            category: categories.ANIMATION,
            showPlus: selection.NONE,
        },
    ]
    const projectsCreated: Array<projectCardProps> = [
        {
            projectId: '1',
            projectName: 'Hired Project 1',
            description: 'This is a description for Hired project 1',
            creationDate: '2021-01-01',
            category: categories.ACCOUNTING,
            showPlus: false,
        },
    ]
    const jobsCreated: Array<jobCardProps> = [
        {
            jobId: '1',
            jobName: 'Created Job 1',
            status: jobStatus.IN_PROGRESS,
            payment: '200',
            description: 'This is a description for Created job 1',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: selection.NONE,
        },
        {
            jobId: '2',
            jobName: 'Created Job 2',
            status: jobStatus.IN_PROGRESS,
            payment: '200',
            description:
                'This is a description for Created job 2, This is a description for Created job 2, This is a description for Created job 2',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: selection.NONE,
        },
    ]

    const firstName = 'John'
    const lastName = 'Doe'
    const jobCreatorId = '1'

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <View style={styles.leftHeaderSection}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                                name="chevron-left-circle"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Profile</Text>
                    </View>
                    <View style={styles.rightHeaderSection}>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    `Invite ${firstName} ${lastName}`,
                                    `Invite ${firstName} ${lastName} to join your network. Once accepted, you can collaborate with ${firstName} ${lastName} on projects and jobs.`,
                                    [
                                        {
                                            text: `Send Invite`,

                                            onPress: () => {},
                                        },
                                        {
                                            text: 'Dismiss',
                                            onPress: () => {},
                                        },
                                    ]
                                )
                            }}
                        >
                            <MaterialCommunityIcons
                                name="account-plus"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Feedback')}
                        >
                            <MaterialCommunityIcons
                                name="account-star"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Network')}
                        >
                            <MaterialCommunityIcons
                                name="account-group"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <UserCard
                    first={firstName}
                    last={lastName}
                    image={''}
                    projectsCreated="1"
                    jobsCreated="2"
                    projectsWorked="3"
                    jobsWorked="4"
                />
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Chat', {
                            userId: jobCreatorId,
                        })
                    }
                    style={styles.chatButtonWrapper}
                >
                    <MaterialCommunityIcons
                        name="message-text"
                        size={22}
                        color={themeColors.YELLOW_GREEN}
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.chatButton}>Chat</Text>
                </TouchableOpacity>
                <View style={styles.buttonSection}>
                    <TouchableOpacity
                        onPress={() => setSwitchColumn('Details')}
                    >
                        <Text
                            style={{
                                ...styles.button,
                                color:
                                    switchColumn === 'Details'
                                        ? themeColors.YELLOW_GREEN
                                        : themeColors.SILVER,
                            }}
                        >
                            Details
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSwitchColumn('Posts')}>
                        <Text
                            style={{
                                ...styles.button,
                                color:
                                    switchColumn === 'Posts'
                                        ? themeColors.YELLOW_GREEN
                                        : themeColors.SILVER,
                            }}
                        >
                            Posts
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSwitchColumn('Hired')}>
                        <Text
                            style={{
                                ...styles.button,
                                color:
                                    switchColumn === 'Hired'
                                        ? themeColors.YELLOW_GREEN
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
                                        ? themeColors.YELLOW_GREEN
                                        : themeColors.SILVER,
                            }}
                        >
                            Created
                        </Text>
                    </TouchableOpacity>
                </View>
                {switchColumn === 'Details' ? (
                    <UserDetailsCard
                        description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nisl eget quam aliquam tincidunt. Nulla facilisi."
                        interests={[
                            categories.ACCOUNTING,
                            categories.ADVERTISING,
                            categories.ANIMATION,
                            categories.ARTIFICAL_INTELLIGENCE,
                            categories.BUSINESS_PROJECT_MANAGEMENT,
                            categories.TRADING_SOFTWARE_DEVELOPMENT,
                        ]}
                        dailyRate="50"
                        links={[
                            {
                                id: '1',
                                url: 'https://www.linkedin.com/xyz',
                            },
                            {
                                id: '2',
                                url: 'https://www.github.com/xyz',
                            },
                            {
                                id: '3',
                                url: 'https://www.x.com/xyz',
                            },
                            {
                                id: '4',
                                url: 'https://www.instagram.com/xyz',
                            },
                        ]}
                    />
                ) : switchColumn === 'Posts' ? (
                    <>
                        {posts.length === 0 ? (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    Posts that you create will be shown here.
                                </Text>
                            </View>
                        ) : (
                            <>
                                {posts.map((post) => (
                                    <PostCard
                                        key={post.postId}
                                        postId={post.postId}
                                        content={post.content}
                                        userId={post.userId}
                                        userName={post.userName}
                                        userAvatar={post.userAvatar}
                                        date={post.date}
                                        attachments={post.attachments}
                                        comments={post.comments}
                                    />
                                ))}
                            </>
                        )}
                    </>
                ) : switchColumn === 'Hired' ? (
                    <>
                        {projectsHired.length === 0 &&
                        jobsHired.length === 0 ? (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    Projects and jobs that you are hired for
                                    will be shown here.
                                </Text>
                            </View>
                        ) : (
                            <>
                                {projectsHired.length !== 0 ? (
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
                                        >
                                            {projectsHired.map((project) => (
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
                                                        width: 350,
                                                        marginRight: 20,
                                                    }}
                                                />
                                            ))}
                                        </ScrollView>
                                    </>
                                ) : null}
                                {jobsHired.length !== 0 ? (
                                    <>
                                        <Text style={styles.subHeading}>
                                            Jobs
                                        </Text>
                                        {jobsHired.map((job) => (
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
                    </>
                ) : switchColumn === 'Created' ? (
                    <>
                        {projectsCreated.length === 0 &&
                        jobsCreated.length === 0 ? (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    Projects and jobs that you create will be
                                    shown here.
                                </Text>
                            </View>
                        ) : (
                            <>
                                {projectsCreated.length !== 0 ? (
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
                                        >
                                            {projectsCreated.map((project) => (
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
                                        <Text style={styles.subHeading}>
                                            Jobs
                                        </Text>
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
                    </>
                ) : null}
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
    leftHeaderSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        justifyContent: 'flex-start',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
        paddingLeft: '5%',
    },
    rightHeaderSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '45%',
        justifyContent: 'space-between',
    },
    chatButtonWrapper: {
        alignItems: 'center',
        marginTop: '5%',
        flexDirection: 'row',
    },
    chatButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
    },
    buttonIcon: {
        marginRight: '3%',
    },
    buttonSection: {
        flexDirection: 'row',
        width: '85%',
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

export default UserScreen
