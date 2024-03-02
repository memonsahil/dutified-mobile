import notification from '../../enums/notification'

type notificationType = {
    notificationId: string
    userId: string
    notificationType: notification
    action?: {
        userId: string
        userName: string
        userAvatar: string
        actioned: boolean
    }
    creationDate: string
}

export default notificationType
