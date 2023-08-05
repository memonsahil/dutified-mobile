import { useState, useEffect } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import useAuthUserStore from '../stores/useAuthUserStore'
import { GiftedChat, IMessage } from 'react-native-gifted-chat'
import screens from '../types/params/screens'
import chatScreenProps from '../types/props/screens/chatScreenProps'

const ChatScreen = ({ route }: chatScreenProps) => {
    const { receiverUserId } = route.params

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
        }, 3000)

        return () => clearTimeout(timeOut)
    })

    const onSend = (newMessages: IMessage[]) => {
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
        <GiftedChat
            messages={messages}
            onSend={(newMessages) => onSend(newMessages)}
            user={{
                _id: userDetails.userId,
                name: `${userDetails.firstName} ${userDetails.lastName}`,
            }}
        />
    )
}

const styles = StyleSheet.create({})

export default ChatScreen
