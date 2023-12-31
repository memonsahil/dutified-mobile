import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import postCardProps from '../../components/props/postCardProps'
import PostCard from '../../components/cards/postCard'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import attachment from '../../enums/attachment'

const FeedScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()
    const posts: Array<postCardProps> = [
        {
            postId: '1',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            userId: '1',
            userName: 'A very very very very long name that will be truncated',
            userAvatar: '',
            date: '2021-01-01',
            attachments: [
                {
                    id: '1',
                    title: 'A very very very very very very very long job name that will be truncated',
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

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>Feed</Text>
                    <View style={styles.iconWrapper}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddPost')}
                        >
                            <MaterialCommunityIcons
                                name="text-box-plus"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Notifications')}
                        >
                            <MaterialCommunityIcons
                                name="bell-circle"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Search')}
                        >
                            <MaterialCommunityIcons
                                name="magnify"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {posts.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            Posts that are shared by your network and created by
                            you will be shown here.
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
        width: '45%',
        justifyContent: 'space-between',
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

export default FeedScreen
