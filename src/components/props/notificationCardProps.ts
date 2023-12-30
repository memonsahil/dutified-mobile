import notification from '../../enums/notification'

type notificationCardProps = {
    notificationId: string
    type: notification
    info: {
        userId?: string
        userName?: string
        userAvatar?: string
        actioned?: boolean
    }
}

export default notificationCardProps
