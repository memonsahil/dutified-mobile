import { Dispatch, SetStateAction } from 'react'
import requestStatus from '../../enums/requestStatus'
import { IMessage } from 'react-native-gifted-chat'
import chatState from '../state/chatState'

export default interface ChatInterface {
    sendMessage: (details: {
        chatId: string
        senderUserId: string
        receiverUserId: string
        messages: IMessage[]
    }) => Promise<{
        status: requestStatus
    }>
    getMessages: (chatId: string) => Promise<{
        status: requestStatus
        data?: IMessage[]
    }>
    getAllChats: (details: {
        userId: string
        chats: []
        setChats: Dispatch<SetStateAction<chatState[]>>
    }) => () => void
}
