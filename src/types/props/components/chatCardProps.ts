import { IMessage } from 'react-native-gifted-chat'

type chatCardProps = {
    receiverUserId: string
    firstName: string
    lastName: string
    imageSrc: string
    messages: IMessage[]
}

export default chatCardProps
