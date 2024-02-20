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
import { useEffect, useState } from 'react'
import PostCard from '../../components/cards/postCard'
import ProjectCard from '../../components/cards/projectCard'
import userScreenProps from '../props/userScreenProps'
import user from '../../data/classes/user'
import promiseType from '../../data/types/promiseType'
import requestStatus from '../../enums/requestStatus'
import projectType from '../../data/types/projectType'
import postType from '../../data/types/postType'
import jobType from '../../data/types/jobType'
import selection from '../../enums/selection'
import * as Progress from 'react-native-progress'
import util from '../../util/util'
import feedbackType from '../../data/types/feedbackType'

const UserScreen = ({ route }: userScreenProps) => {
    const { userId } = route.params

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [profilePicture, setProfilePicture] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [ratePerDay, setRatePerDay] = useState<string>('')
    const [interests, setInterests] = useState<string[]>([])
    const [links, setLinks] = useState<string[]>([])
    const [posts, setPosts] = useState<postType[]>([])
    const [projectsCreated, setProjectsCreated] = useState<projectType[]>([])
    const [projectsWorked, setProjectsWorked] = useState<projectType[]>([])
    const [jobsCreated, setJobsCreated] = useState<jobType[]>([])
    const [jobsWorked, setJobsWorked] = useState<jobType[]>([])
    const [feedbacks, setFeedbacks] = useState<feedbackType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const [switchColumn, setSwitchColumn] = useState<
        'Details' | 'Posts' | 'Hired' | 'Created'
    >('Details')

    useEffect(() => {
        user.getUser({ userId: userId }).then((response: promiseType) => {
            if (response.status === requestStatus.SUCCESS && response.data) {
                setFirstName(response.data.profile.firstName)
                setLastName(response.data.profile.lastName)
                setProfilePicture(response.data.profile.profilePicture)
                setDescription(response.data.profile.bio)
                setRatePerDay(response.data.profile.ratePerDay)
                setInterests(response.data.profile.interests)
                setLinks(response.data.profile.links)
                setPosts(response.data.userPosts)
                setProjectsCreated(response.data.projectsCreated)
                setProjectsWorked(response.data.projectsWorked)
                setJobsCreated(response.data.jobsCreated)
                setJobsWorked(response.data.jobsWorked)
                setFeedbacks(response.data.feedbacks)
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
    }, [userId])

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            {loading === false ? (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.headerSection}>
                        <View style={styles.leftHeaderSection}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <MaterialCommunityIcons
                                    name="chevron-left-circle"
                                    size={26}
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
                                    size={26}
                                    color={themeColors.YELLOW_GREEN}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Feedback')}
                            >
                                <MaterialCommunityIcons
                                    name="account-star"
                                    size={26}
                                    color={themeColors.YELLOW_GREEN}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Network')}
                            >
                                <MaterialCommunityIcons
                                    name="account-group"
                                    size={26}
                                    color={themeColors.YELLOW_GREEN}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <UserCard
                        first={firstName}
                        last={lastName}
                        image={profilePicture}
                        projectsCreated={projectsCreated.length.toString()}
                        jobsCreated={jobsCreated.length.toString()}
                        projectsWorked={projectsWorked.length.toString()}
                        jobsWorked={jobsWorked.length.toString()}
                        avgRating={util.avgRating(feedbacks ? feedbacks : [])}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Chat', {
                                userId: userId,
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
                        <TouchableOpacity
                            onPress={() => setSwitchColumn('Posts')}
                        >
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
                        <TouchableOpacity
                            onPress={() => setSwitchColumn('Hired')}
                        >
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
                            description={description}
                            interests={interests}
                            dailyRate={ratePerDay}
                            links={links}
                        />
                    ) : switchColumn === 'Posts' ? (
                        <>
                            {posts.length === 0 ? (
                                <View style={styles.noDataContainer}>
                                    <Text style={styles.noDataText}>
                                        {firstName} {lastName} has not created
                                        any posts yet.
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
                            {projectsWorked.length === 0 &&
                            jobsWorked.length === 0 ? (
                                <View style={styles.noDataContainer}>
                                    <Text style={styles.noDataText}>
                                        {firstName} {lastName} has not been
                                        hired for any projects or jobs yet.
                                    </Text>
                                </View>
                            ) : (
                                <>
                                    {projectsWorked.length !== 0 ? (
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
                                                {projectsWorked.map(
                                                    (project) => (
                                                        <ProjectCard
                                                            key={
                                                                project.projectId
                                                            }
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
                                    {jobsWorked.length !== 0 ? (
                                        <>
                                            <Text style={styles.subHeading}>
                                                Jobs
                                            </Text>
                                            {jobsWorked.map((job) => (
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
                    ) : switchColumn === 'Created' ? (
                        <>
                            {projectsCreated.length === 0 &&
                            jobsCreated.length === 0 ? (
                                <View style={styles.noDataContainer}>
                                    <Text style={styles.noDataText}>
                                        {firstName} {lastName} has not created
                                        any projects or jobs yet.
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
                                                pagingEnabled={true}
                                                decelerationRate="fast"
                                                snapToInterval={370}
                                            >
                                                {projectsCreated.map(
                                                    (project) => (
                                                        <ProjectCard
                                                            key={
                                                                project.projectId
                                                            }
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
                                                    description={
                                                        job.description
                                                    }
                                                    creationDate={
                                                        job.creationDate
                                                    }
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
                    ) : null}
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
