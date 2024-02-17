import notification from '../../enums/notification'

type notificationType = {
    notificationId: string
    type: notification
    info: {
        userId?: string
        userName?: string
        userAvatar?: string
        actioned?: boolean
    }
}

export default notificationType
