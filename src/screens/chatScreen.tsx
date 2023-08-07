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
import useUserStore from '../stores/useUserStore'
import useAuthUserStore from '../stores/useAuthUserStore'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import * as Crypto from 'expo-crypto'
import { Avatar } from 'react-native-elements'
import * as Progress from 'react-native-progress'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { black, blue, gray, green, white } from '../theme/colors'
import screens from '../types/params/screens'
import chatScreenProps from '../types/props/screens/chatScreenProps'

const ChatScreen = ({ route }: chatScreenProps) => {
    const { receiverUserId } = route.params

    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<IMessage[]>([])

    const [first, setFirst] = useState<string>('')
    const [last, setLast] = useState<string>('')
    const [image, setImage] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(true)

    const { getUserData } = useUserStore((state) => state)
    const { userDetails, sendMessage, getMessages } = useAuthUserStore(
        (state) => state
    )

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        getUserData(receiverUserId)
            .then((result) => {
                setFirst(result.data?.userDetails.firstName!)
                setLast(result.data?.userDetails.lastName!)

                result.data?.userDetails.imageSrc! !== image
                    ? setImage(result.data?.userDetails.imageSrc!)
                    : null
            })
            .catch(() => {
                Alert.alert(
                    'Error Occurred',
                    'An error occurred, please try again or contact our support team.',
                    [
                        {
                            text: 'Dismiss',
                            onPress: () => {
                                navigation.goBack()
                            },
                        },
                    ]
                )
            })
    }, [receiverUserId])

    useEffect(() => {
        let timeOut = setTimeout(() => {
            getMessages([userDetails.userId, receiverUserId].sort().join('-'))
                .then((result) => {
                    setMessages(result.data)

                    first !== '' && last !== '' ? setLoading(false) : null
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

    useEffect(() => {})

    const onSend = (newMessages: IMessage[]) => {
        setMessage('')

        setMessages((previousMessages: IMessage[]) =>
            GiftedChat.append(previousMessages, newMessages)
        )

        sendMessage({
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
                        <AntDesign
                            name="caretleft"
                            size={30}
                            color={green}
                            onPress={() => navigation.goBack()}
                        />
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
                            >{`${first} ${last}`}</Text>
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
                                    image
                                        ? { uri: image }
                                        : require('../../assets/images/user-avatar.png')
                                }
                                containerStyle={styles.avatarContainer}
                            />
                        </TouchableOpacity>
                    </View>
                    <GiftedChat
                        messages={messages}
                        user={{
                            _id: userDetails.userId,
                            name: `${userDetails.firstName} ${userDetails.lastName}`,
                        }}
                        renderAvatar={null}
                        listViewProps={{
                            style: styles.chatView,
                            showsVerticalScrollIndicator: false,
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
                                            placeholderTextColor={gray}
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
                                                color={green}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={() => {}}>
                                        <FontAwesome5
                                            name="file-signature"
                                            size={20}
                                            color={green}
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
                        color={green}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blue,
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
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 24,
        color: white,
    },
    avatarContainer: {
        backgroundColor: green,
    },
    chatView: {
        backgroundColor: white,
    },
    toolbar: {
        backgroundColor: blue,
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
        backgroundColor: white,
        width: '100%',
        height: 45,
        paddingVertical: 9,
        paddingLeft: 15,
        borderColor: blue,
        borderWidth: 4,
        borderRadius: 20,
        marginRight: '4%',
        fontFamily: 'IBMPlexSans-Regular',
        color: black,
        fontSize: 16,
    },
})

export default ChatScreen
