import { Dispatch, SetStateAction } from 'react'
import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import requestStatus from '../enums/requestStatus'
import ChatInterface from '../interfaces/actions/chatInterface'
import { IMessage } from 'react-native-gifted-chat'
import chatState from '../interfaces/state/chatState'

class Chat implements ChatInterface {
    async sendMessage(details: {
        chatId: string
        senderUserId: string
        receiverUserId: string
        messages: IMessage[]
    }) {
        let allChats: chatState[] = []
        let chatIndex: number
        let updatedChat: chatState
        let newChat: chatState

        let senderRef = firestore()
            .collection('allUsers')
            .where('userDetails.userId', '==', details.senderUserId)
            .limit(1)

        return await senderRef
            .get()
            .then(async (querySnapshot) => {
                allChats = querySnapshot.docs[0].data().chats
                chatIndex = allChats.findIndex(
                    (chat) => chat.chatId === details.chatId
                )

                if (chatIndex !== -1) {
                    updatedChat = { ...allChats[chatIndex] }
                    updatedChat.messages = [
                        ...updatedChat.messages,
                        details.messages[details.messages.length - 1],
                    ]

                    allChats[chatIndex] = updatedChat
                    await querySnapshot.docs[0].ref.update({ chats: allChats })

                    return Promise.resolve({
                        status: requestStatus.SUCCESS,
                    })
                } else {
                    newChat = {
                        chatId: details.chatId,
                        messages: details.messages,
                        senderUserId: details.senderUserId,
                        receiverUserId: details.receiverUserId,
                    }

                    allChats.push(newChat)
                    await querySnapshot.docs[0].ref.update({ chats: allChats })

                    return Promise.resolve({
                        status: requestStatus.SUCCESS,
                    })
                }
            })
            .catch(() => {
                return Promise.resolve({
                    status: requestStatus.ERROR,
                })
            })
    }

    async getMessages(chatId: string) {
        let messagesData: Array<IMessage> = []

        return await firestore()
            .collection('allChats')
            .doc(chatId)
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.data()?.messages) {
                    messagesData = querySnapshot
                        .data()
                        ?.messages.map(
                            (message: {
                                createdAt: FirebaseFirestoreTypes.Timestamp
                            }) => {
                                return {
                                    ...message,
                                    createdAt: message.createdAt.toDate(),
                                }
                            }
                        )
                        .reverse() as Array<IMessage>
                    return Promise.resolve({
                        status: requestStatus.SUCCESS,
                        data: messagesData,
                    })
                } else {
                    return Promise.resolve({
                        status: requestStatus.SUCCESS,
                        data: [],
                    })
                }
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    getAllChats(details: {
        userId: string
        chats: chatState[]
        setChats: Dispatch<SetStateAction<chatState[]>>
    }) {
        let chatsData: chatState[] = []
        let docData: chatState

        return firestore()
            .collection('allChats')
            .onSnapshot((querySnapshot) => {
                querySnapshot.docs.forEach((doc) => {
                    docData = doc.data() as chatState

                    if (docData.chatId.includes(details.userId)) {
                        if (
                            !details.chats.some(
                                (chat) => chat.chatId === docData.chatId
                            )
                        ) {
                            chatsData.push(docData)
                        }
                    }
                })

                if (chatsData.length > 0) {
                    details.setChats(chatsData)
                }
            })
    }
}

export default new Chat()
