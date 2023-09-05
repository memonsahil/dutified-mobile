import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
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

const ProfileScreen = () => {
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
            jobAttachments: [
                {
                    jobId: '1',
                    jobName: 'Created Job 1',
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
            jobAttachments: [
                {
                    jobId: '1',
                    jobName: 'Created Job 1',
                },
                {
                    jobId: '2',
                    jobName: 'Created Job 2',
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
            jobAttachments: [],
            comments: '1',
        },
    ]
    const jobsHired: Array<jobCardProps> = [
        {
            jobId: '1',
            jobName: 'Created Job 1',
            status: jobStatus.AVAILABLE,
            payment: '100000',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ACCOUNTING,
        },
        {
            jobId: '2',
            jobName: 'Created Job 2',
            status: jobStatus.IN_PROGRESS,
            payment: '200',
            description: 'This is a description for Created job 2',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
        },
        {
            jobId: '3',
            jobName: 'Created Job 3',
            status: jobStatus.COMPLETED,
            payment: '200',
            description: 'This is a description for Created job 3',
            creationDate: '2021-01-01',
            category: categories.ANIMATION,
        },
    ]
    const jobsCreated: Array<jobCardProps> = [
        {
            jobId: '1',
            jobName: 'Created Job 1',
            status: jobStatus.AVAILABLE,
            payment: '100000',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ACCOUNTING,
        },
        {
            jobId: '2',
            jobName: 'Created Job 2',
            status: jobStatus.IN_PROGRESS,
            payment: '200',
            description: 'This is a description for Created job 2',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
        },
    ]

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>Profile</Text>
                    <View style={styles.iconWrapper}>
                        <TouchableOpacity onPress={() => {}}>
                            <MaterialCommunityIcons
                                name="account-star"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <MaterialCommunityIcons
                                name="account-multiple"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <MaterialCommunityIcons
                                name="account-edit"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <UserCard
                    first={'Sahil'}
                    last={'Memon'}
                    image={''}
                    totalProjects="0"
                    totalJobs="3"
                />
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
                        hourlyRate="50"
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
                                    Posts that are created by you will be shown
                                    here.
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
                                        jobAttachments={post.jobAttachments}
                                        comments={post.comments}
                                    />
                                ))}
                            </>
                        )}
                    </>
                ) : switchColumn === 'Hired' ? (
                    <>
                        {jobsHired.length === 0 ? (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    Jobs that you are hired for will be shown
                                    here.
                                </Text>
                            </View>
                        ) : (
                            <>
                                {jobsHired.map((job) => (
                                    <JobCard
                                        key={job.jobId}
                                        nav={navigation}
                                        jobId={job.jobId}
                                        jobName={job.jobName}
                                        status={job.status}
                                        payment={job.payment}
                                        description={job.description}
                                        creationDate={job.creationDate}
                                        category={job.category}
                                    />
                                ))}
                            </>
                        )}
                    </>
                ) : switchColumn === 'Created' ? (
                    <>
                        {jobsCreated.length === 0 ? (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    Jobs that are created by you will be shown
                                    here.
                                </Text>
                            </View>
                        ) : (
                            <>
                                {jobsCreated.map((job) => (
                                    <JobCard
                                        key={job.jobId}
                                        nav={navigation}
                                        jobId={job.jobId}
                                        jobName={job.jobName}
                                        status={job.status}
                                        payment={job.payment}
                                        description={job.description}
                                        creationDate={job.creationDate}
                                        category={job.category}
                                    />
                                ))}
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
        justifyContent: 'space-between',
        paddingBottom: '20%',
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        justifyContent: 'space-between',
    },
    buttonSection: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
        paddingTop: '5%',
        marginBottom: '5%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
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

export default ProfileScreen
