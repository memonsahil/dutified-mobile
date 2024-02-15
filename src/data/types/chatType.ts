import { IMessage } from 'react-native-gifted-chat'

type chatType = {
    chatId: string
    initialSenderId: string
    initialSenderName: string
    initialSenderAvatar: string
    initialReceiverId: string
    initialReceiverName: string
    initialReceiverAvatar: string
    messages: IMessage[]
}

export default chatType
