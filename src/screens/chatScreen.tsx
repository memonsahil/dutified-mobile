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
import useAuthUserStore from '../stores/useAuthUserStore'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import * as Crypto from 'expo-crypto'
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

    const { userDetails, sendMessage, getMessages } = useAuthUserStore(
        (state) => state
    )

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        let timeOut = setTimeout(() => {
            getMessages([userDetails.userId, receiverUserId].sort().join('-'))
                .then((result) => {
                    setMessages(result.data)
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
        }, 2000)

        return () => clearTimeout(timeOut)
    })

    const onSend = (newMessages: IMessage[]) => {
        setMessage('')
        setMessages((previousMessages: IMessage[]) =>
            GiftedChat.append(previousMessages, newMessages)
        )

        sendMessage({
            chatId: [userDetails.userId, receiverUserId].sort().join('-'),
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
            <View style={styles.headerSection}>
                <AntDesign
                    name="caretleft"
                    size={30}
                    color={green}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.heading}>Chats</Text>
            </View>
            <GiftedChat
                messages={messages}
                onSend={(newMessages) => onSend(newMessages)}
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
                                                      createdAt: new Date(),
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blue,
        paddingBottom: '9%',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 30,
        color: white,
        paddingLeft: 20,
        paddingRight: 30,
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
