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
import { useState } from 'react'
import PostCard from '../../components/cards/postCard'
import ProjectCard from '../../components/cards/projectCard'
import authStore from '../../state/stores/authStore'
import selection from '../../enums/selection'
import util from '../../util/util'

const ProfileScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()
    const [switchColumn, setSwitchColumn] = useState<
        'Details' | 'Posts' | 'Hired' | 'Created'
    >('Details')

    const currentUser = authStore((state) => state.currentUser)

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>You</Text>
                    <View style={styles.iconWrapper}>
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
                    first={
                        currentUser?.profile.firstName
                            ? currentUser?.profile.firstName
                            : ''
                    }
                    last={
                        currentUser?.profile.lastName
                            ? currentUser?.profile.lastName
                            : ''
                    }
                    image={currentUser?.profile.profilePicture!}
                    avgRating={util.avgRating(
                        currentUser?.feedbacks ? currentUser?.feedbacks : []
                    )}
                    projectsCreated={
                        currentUser?.projectsCreated.length
                            ? currentUser?.projectsCreated.length.toString()
                            : '0'
                    }
                    jobsCreated={
                        currentUser?.jobsCreated.length
                            ? currentUser?.jobsCreated.length.toString()
                            : '0'
                    }
                    projectsWorked={
                        currentUser?.projectsWorked.length
                            ? currentUser?.projectsWorked.length.toString()
                            : '0'
                    }
                    jobsWorked={
                        currentUser?.jobsWorked.length
                            ? currentUser?.jobsWorked.length.toString()
                            : '0'
                    }
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
                        description={currentUser?.profile.bio!}
                        interests={currentUser?.profile.interests!}
                        links={util.formatLinks(
                            currentUser?.profile.links
                                ? currentUser?.profile.links
                                : []
                        )}
                        dailyRate={currentUser?.profile.ratePerDay!}
                    />
                ) : switchColumn === 'Posts' ? (
                    <>
                        {currentUser?.posts.length === 0 ? (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    Posts that you create will be shown here.
                                </Text>
                            </View>
                        ) : (
                            <>
                                {currentUser?.posts.map((post) => (
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
                ) : switchColumn === 'Created' ? (
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
        width: '30%',
        justifyContent: 'space-between',
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

export default ProfileScreen
