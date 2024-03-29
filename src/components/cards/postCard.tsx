import { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Linking,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import postCardProps from '../props/postCardProps'
import { Avatar } from 'react-native-elements'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import screens from '../../screens/params/screens'
import CommentsModal from '../modals/commentsModal'
import attachment from '../../enums/attachments'
import authStore from '../../state/stores/authStore'

const PostCard = (props: postCardProps) => {
    const [image, setImage] = useState<string>('')
    const [modalVisible, setModalVisible] = useState(false)

    const currentUser = authStore((state) => state.currentUser)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        props.creatorAvatar !== image ? setImage(props.creatorAvatar) : null
    }, [props.creatorAvatar])

    return (
        <View style={styles.container}>
            <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                    <TouchableOpacity
                        onPress={() =>
                            props.creatorId === currentUser?.userId
                                ? navigation.navigate('Profile')
                                : navigation.navigate('User', {
                                      userId: props.creatorId,
                                  })
                        }
                    >
                        <Avatar
                            size="medium"
                            rounded
                            source={
                                image
                                    ? { uri: image }
                                    : require('../../../assets/images/user-avatar.png')
                            }
                            containerStyle={styles.avatarContainer}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            props.creatorId === currentUser?.userId
                                ? navigation.navigate('Profile')
                                : navigation.navigate('User', {
                                      userId: props.creatorId,
                                  })
                        }
                    >
                        <Text
                            style={styles.userName}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {props.creatorName}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            `Report this post from ${props.creatorName}`,
                            'Report inappropriate or suspicious activity.',
                            [
                                {
                                    text: `Report`,

                                    onPress: () =>
                                        Linking.openURL(
                                            'mailto:support@dutified.com'
                                        ).catch(() => {
                                            Alert.alert(
                                                'Setup Email',
                                                'Please setup your email address on this device first.',
                                                [
                                                    {
                                                        text: 'Dismiss',
                                                        onPress: () => {},
                                                    },
                                                ]
                                            )
                                        }),
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
                        name="dots-vertical"
                        size={28}
                        color={themeColors.GREEN}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.post}>{props.postDesc}</Text>
            {props.attachments?.length !== 0
                ? props.attachments?.map((_attachment) => (
                      <TouchableOpacity
                          key={_attachment.attachmentId}
                          onPress={() => {
                              _attachment.attachmentType === attachment.JOB
                                  ? navigation.navigate('Job', {
                                        jobId: _attachment.attachmentId,
                                    })
                                  : navigation.navigate('Project', {
                                        projectId: _attachment.attachmentId,
                                    })
                          }}
                      >
                          <Text style={styles.attachment}>
                              {_attachment.title}
                          </Text>
                      </TouchableOpacity>
                  ))
                : null}
            <Text style={styles.date}>{props.creationDate}</Text>
            <View style={styles.border} />
            <View style={styles.postFooter}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Chat', {
                            userId: props.creatorId,
                        })
                    }}
                    style={styles.postButton}
                >
                    <MaterialCommunityIcons
                        name="message-arrow-right"
                        size={28}
                        color={themeColors.GREEN}
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.button}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={styles.postButton}
                >
                    <MaterialCommunityIcons
                        name="comment-text"
                        size={28}
                        color={themeColors.GREEN}
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.button}>
                        {`Comment (${props.comments?.length})`}
                    </Text>
                </TouchableOpacity>
            </View>
            <CommentsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                postId={props.postId}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.WHITE,
        width: '90%',
        borderRadius: 20,
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        overflow: 'hidden',
        marginTop: '5%',
    },
    postHeader: {
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    avatarContainer: {
        backgroundColor: themeColors.GREEN,
    },
    userName: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        justifyContent: 'flex-start',
        paddingLeft: '5%',
        paddingRight: '7%',
    },
    post: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
    attachment: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.GREEN,
        marginBottom: '5%',
        textDecorationLine: 'underline',
    },
    date: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
    border: {
        width: '100%',
        borderColor: themeColors.BLACK,
        borderWidth: 1,
        marginBottom: '5%',
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    postButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.GREEN,
    },
    buttonIcon: {
        marginRight: '3%',
    },
})

export default PostCard
