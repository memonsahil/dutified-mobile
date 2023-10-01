import { IMessage } from 'react-native-gifted-chat'

type chatType = {
    chatId: string
    senderUserId: string
    receiverUserId: string
    messages: IMessage[]
}

export default chatType
