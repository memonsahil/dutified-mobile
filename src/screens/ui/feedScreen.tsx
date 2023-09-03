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

const FeedScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()
    const posts: Array<postCardProps> = [
        {
            postId: '1',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            userId: '1',
            userName: 'Sahil Memon',
            userAvatar: '',
            date: '2021-01-01',
            likes: '1',
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
            likes: '1',
            comments: '1',
        },
    ]

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>Feed</Text>
                    <View style={styles.iconWrapper}>
                        <TouchableOpacity onPress={() => {}}>
                            <MaterialCommunityIcons
                                name="text-box-plus"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
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
                                likes={post.likes}
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
        paddingBottom: '5%',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
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
