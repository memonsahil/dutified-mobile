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
import PostCard from '../../components/cards/postCard'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import authStore from '../../state/stores/authStore'

const FeedScreen = () => {
    const currentUser = authStore((state) => state.currentUser)

    const navigation: NavigationProp<screens> = useNavigation()

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
                                size={28}
                                color={themeColors.GREEN}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Notifications')}
                        >
                            <MaterialCommunityIcons
                                name="bell-circle"
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
                {currentUser?.userFeedPosts.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            Posts that you create and are shared by your network
                            will be shown here.
                        </Text>
                    </View>
                ) : (
                    <>
                        {currentUser?.userFeedPosts.map((post) => (
                            <PostCard
                                key={post.postId}
                                postId={post.postId}
                                creatorId={post.creatorId}
                                creatorName={post.creatorName}
                                creatorAvatar={post.creatorAvatar}
                                images={post.images}
                                postDesc={post.postDesc}
                                attachments={post.attachments}
                                comments={post.comments}
                                creationDate={post.creationDate}
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
