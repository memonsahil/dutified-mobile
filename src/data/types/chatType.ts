import { IMessage } from 'react-native-gifted-chat'

type chatType = {
    chatId: string
    userOneId: string
    userOneName: string
    userOneAvatar: string
    userTwoId: string
    userTwoName: string
    userTwoAvatar: string
    messages: IMessage[]
    creationDate: string
}

export default chatType
