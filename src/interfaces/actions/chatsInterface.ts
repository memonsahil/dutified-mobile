import requestStatus from '../../enums/requestStatus'
import { IMessage } from 'react-native-gifted-chat'
import chatState from '../state/chatState'

export default interface ChatsInterface {
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
    getAllChats: (userId: string) => Promise<{
        status: requestStatus
        data?: chatState[]
    }>
}
