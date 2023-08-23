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
        let messagesDocRef: FirebaseFirestoreTypes.DocumentReference =
            firestore().collection('allChats').doc(details.chatId)
        let messagesData: Array<IMessage> = []

        return await messagesDocRef
            .get()
            .then(async (querySnapshot) => {
                if (querySnapshot.exists) {
                    messagesData = [
                        ...querySnapshot.data()?.messages,
                        details.messages[details.messages.length - 1],
                    ]

                    await messagesDocRef.update({
                        messages: messagesData,
                    })
                } else {
                    await messagesDocRef.set({
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

    getAllChats(details: {
        userId: string
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
                        chatsData.push(docData)
                    }
                })

                details.setChats(chatsData)
            })
    }
}

export default new Chat()
