import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import requestStatus from '../enums/requestStatus'
import ChatsInterface from '../interfaces/actions/chatsInterface'
import { IMessage } from 'react-native-gifted-chat'
import chatState from '../interfaces/state/chatState'

class Chats implements ChatsInterface {
    async sendMessage(details: {
        chatId: string
        senderUserId: string
        receiverUserId: string
        messages: IMessage[]
    }) {
        let messagesData: Array<IMessage> = []

        return await firestore()
            .collection('allChats')
            .doc(details.chatId)
            .get()
            .then(async (querySnapshot) => {
                if (querySnapshot.exists) {
                    messagesData = [
                        ...querySnapshot.data()?.messages,
                        details.messages[details.messages.length - 1],
                    ]

                    await querySnapshot.ref.update({
                        messages: messagesData,
                    })
                } else {
                    await querySnapshot.ref.set({
                        chatId: details.chatId,
                        senderUserId: details.senderUserId,
                        receiverUserId: details.receiverUserId,
                        messages: details.messages,
                    })
                }

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
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

    async getAllChats(userId: string) {
        let chats: chatState[] = []

        return await firestore()
            .collection('allChats')
            .get()
            .then((querySnapshot) => {
                querySnapshot.docs.filter((doc) => {
                    doc.id.includes(userId)
                        ? chats.push(doc.data() as chatState)
                        : null
                })

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                    data: chats,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }
}

export default new Chats()
