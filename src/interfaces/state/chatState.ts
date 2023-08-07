import { IMessage } from 'react-native-gifted-chat'

export default interface chatState {
    chatId: string
    senderUserId: string
    receiverUserId: string
    messages: IMessage[]
}
