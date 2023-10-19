import { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Modal,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import postCardProps from '../props/postCardProps'
import { Avatar } from 'react-native-elements'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'
import screens from '../../screens/params/screens'
import attachmentType from '../../enums/attachmentType'
import CommentsModal from '../modals/commentsModal'

const PostCard = (props: postCardProps) => {
    const [image, setImage] = useState<string>('')
    const [modalVisible, setModalVisible] = useState(false)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        props.userAvatar !== image ? setImage(props.userAvatar) : null
    }, [props.userAvatar])

    return (
        <View style={styles.container}>
            <View style={styles.postHeader}>
                <View style={styles.userInfo}>
                    <Avatar
                        size="small"
                        rounded
                        source={
                            image
                                ? { uri: image }
                                : require('../../../assets/images/user-avatar.png')
                        }
                        containerStyle={styles.avatarContainer}
                    />
                    <Text
                        style={styles.userName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {props.userName}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            `Report post by ${props.userName}`,
                            'Report inappropriate or suspicious activity.',
                            [
                                {
                                    text: `Report`,

                                    onPress: () =>
                                        MailComposer.composeAsync({
                                            recipients: [
                                                'support@dutified.com',
                                            ],
                                        }).catch(() => {
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
                        size={22}
                        color={themeColors.BLACK}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.post}>{props.content}</Text>
            {props.attachments?.length !== 0
                ? props.attachments?.map((attachment) => (
                      <TouchableOpacity
                          key={attachment.id}
                          onPress={() => {
                              attachment.type === attachmentType.JOB
                                  ? navigation.navigate('Job', {
                                        jobId: attachment.id,
                                    })
                                  : navigation.navigate('Project', {
                                        projectId: attachment.id,
                                    })
                          }}
                      >
                          <Text style={styles.jobAttachment}>
                              {attachment.title}
                          </Text>
                      </TouchableOpacity>
                  ))
                : null}
            <Text style={styles.date}>{props.date}</Text>
            <View style={styles.border} />
            <View style={styles.postFooter}>
                <TouchableOpacity onPress={() => {}} style={styles.postButton}>
                    <MaterialCommunityIcons
                        name="message-arrow-right"
                        size={22}
                        color={themeColors.YELLOW_GREEN}
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
                        size={22}
                        color={themeColors.YELLOW_GREEN}
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.button}>Comment (200)</Text>
                </TouchableOpacity>
            </View>
            <CommentsModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
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
        width: '80%',
    },
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
    },
    userName: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        textAlign: 'center',
        paddingLeft: '5%',
    },
    post: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
    jobAttachment: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.YELLOW_GREEN,
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
        borderBottomColor: themeColors.BLACK,
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
        color: themeColors.YELLOW_GREEN,
    },
    buttonIcon: {
        marginRight: '3%',
    },
})

export default PostCard
