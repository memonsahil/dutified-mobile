import { useState, useEffect } from 'react'
import {
    StyleSheet,
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Chat from '../data/chat'
import User from '../data/user'
import useAuthUserStore from '../stores/useAuthUserStore'
import {
    GiftedChat,
    IMessage,
    Bubble,
    Day,
    Time,
} from 'react-native-gifted-chat'
import * as Crypto from 'expo-crypto'
import { Avatar } from 'react-native-elements'
import * as Progress from 'react-native-progress'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import colors from '../enums/colors'
import fonts from '../enums/fonts'
import screens from '../types/params/screens'
import chatScreenProps from '../types/props/screens/chatScreenProps'

const ChatScreen = ({ route }: chatScreenProps) => {
    const { receiverUserId } = route.params

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [imageSrc, setImageSrc] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [allMessages, setAllMessages] = useState<IMessage[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const { userDetails } = useAuthUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        User.getUserData(receiverUserId)
            .then((result) => {
                setFirstName(result.data?.userDetails.firstName!)
                setLastName(result.data?.userDetails.lastName!)
                setImageSrc(result.data?.userDetails.imageSrc!)
            })
            .catch(() => {
                Alert.alert(
                    'Error Occurred',
                    'An error occurred, please try again or contact our support team.',
                    [
                        {
                            text: 'Dismiss',
                            onPress: () => navigation.goBack(),
                        },
                    ]
                )
            })
    }, [])

    useEffect(() => {
        let timeOut = setTimeout(() => {
            Chat.getMessages(
                [userDetails.userId, receiverUserId].sort().join('-')
            )
                .then((result) => {
                    setAllMessages(result.data)

                    if (firstName !== '' && lastName !== '') setLoading(false)
                })
                .catch(() => {
                    Alert.alert(
                        'Error Occurred',
                        'An error occurred, please try again or contact our support team.',
                        [
                            {
                                text: 'Dismiss',
                                onPress: () => navigation.goBack(),
                            },
                        ]
                    )
                })
        }, 4000)

        return () => clearTimeout(timeOut)
    })

    const onSend = (newMessages: IMessage[]) => {
        setMessage('')

        setAllMessages((previousMessages: IMessage[]) =>
            GiftedChat.append(previousMessages, newMessages)
        )

        Chat.sendMessage({
            chatId: [userDetails.userId, receiverUserId].sort().join('-'),
            senderUserId: userDetails.userId,
            receiverUserId: receiverUserId,
            messages: newMessages,
        }).catch(() => {
            Alert.alert(
                'Error Occurred',
                'An error occurred, please try again or contact our support team.',
                [
                    {
                        text: 'Dismiss',
                        onPress: () => navigation.goBack(),
                    },
                ]
            )
        })
    }

    return (
        <View style={styles.container}>
            {loading === false ? (
                <>
                    <View style={styles.headerSection}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign
                                name="caretleft"
                                size={30}
                                color={colors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('User', {
                                    userId: receiverUserId,
                                })
                            }
                        >
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={styles.heading}
                            >{`${firstName} ${lastName}`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('User', {
                                    userId: receiverUserId,
                                })
                            }
                        >
                            <Avatar
                                size="small"
                                rounded
                                source={
                                    imageSrc
                                        ? { uri: imageSrc }
                                        : require('../../assets/images/user-avatar.png')
                                }
                                containerStyle={styles.avatarContainer}
                            />
                        </TouchableOpacity>
                    </View>
                    <GiftedChat
                        messages={allMessages}
                        user={{
                            _id: userDetails.userId,
                            name: `${userDetails.firstName} ${userDetails.lastName}`,
                        }}
                        renderAvatar={null}
                        listViewProps={{
                            style: styles.chatView,
                            showsVerticalScrollIndicator: false,
                        }}
                        renderDay={(props) => {
                            return (
                                <Day
                                    {...props}
                                    textStyle={{
                                        color: colors.JET,
                                        fontFamily:
                                            'IBMPlexSansCondensed-Medium',
                                    }}
                                />
                            )
                        }}
                        renderBubble={(props) => {
                            return (
                                <Bubble
                                    {...props}
                                    wrapperStyle={{
                                        left: {
                                            backgroundColor:
                                                colors.YELLOW_GREEN,
                                        },
                                        right: {
                                            backgroundColor:
                                                colors.YELLOW_GREEN,
                                        },
                                    }}
                                    textStyle={{
                                        left: {
                                            color: colors.JET,
                                            fontFamily:
                                                'IBMPlexSansCondensed-Medium',
                                        },
                                        right: {
                                            color: colors.JET,
                                            fontFamily:
                                                'IBMPlexSansCondensed-Medium',
                                        },
                                    }}
                                    renderTime={(props) => {
                                        return (
                                            <Time
                                                {...props}
                                                timeTextStyle={{
                                                    left: {
                                                        color: colors.JET,
                                                        fontFamily:
                                                            'IBMPlexSansCondensed-Medium',
                                                    },
                                                    right: {
                                                        color: colors.JET,
                                                        fontFamily:
                                                            'IBMPlexSansCondensed-Medium',
                                                    },
                                                }}
                                            />
                                        )
                                    }}
                                />
                            )
                        }}
                        renderInputToolbar={() => {
                            return (
                                <View style={styles.toolbar}>
                                    <View style={styles.inputSection}>
                                        <TextInput
                                            placeholder="Your message"
                                            value={message}
                                            onChangeText={setMessage}
                                            style={styles.input}
                                            placeholderTextColor={colors.SILVER}
                                            multiline={false}
                                        />
                                        <TouchableOpacity
                                            onPress={() =>
                                                message !== ''
                                                    ? onSend([
                                                          {
                                                              _id: Crypto.randomUUID(),
                                                              text: message,
                                                              createdAt:
                                                                  new Date(),
                                                              user: {
                                                                  _id: userDetails.userId,
                                                                  name: `${userDetails.firstName} ${userDetails.lastName}`,
                                                              },
                                                          },
                                                      ])
                                                    : null
                                            }
                                        >
                                            <Ionicons
                                                name="send"
                                                size={20}
                                                color={colors.YELLOW_GREEN}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={() => {}}>
                                        <FontAwesome5
                                            name="file-signature"
                                            size={20}
                                            color={colors.YELLOW_GREEN}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={colors.YELLOW_GREEN}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.RAISIN_BLACK,
        paddingBottom: '8%',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '20%',
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.BUTTON_ONE,
        color: colors.PLATINUM,
    },
    avatarContainer: {
        backgroundColor: colors.YELLOW_GREEN,
    },
    chatView: {
        backgroundColor: colors.PLATINUM,
    },
    toolbar: {
        backgroundColor: colors.RAISIN_BLACK,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: Platform.OS === 'ios' ? '3%' : 0,
        paddingLeft: '2%',
        paddingRight: '4%',
    },
    inputSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
    },
    input: {
        backgroundColor: colors.PLATINUM,
        width: '100%',
        height: 45,
        paddingVertical: Platform.OS === 'ios' ? 0 : 9,
        paddingLeft: 20,
        borderColor: colors.RAISIN_BLACK,
        borderTopWidth: Platform.OS === 'ios' ? 5 : 3,
        borderBottomWidth: 5,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderRadius: 15,
        marginRight: '4%',
        fontFamily: 'IBMPlexSansCondensed-Medium',
        color: colors.JET,
        fontSize: fonts.BODY_TWO,
    },
})

export default ChatScreen
