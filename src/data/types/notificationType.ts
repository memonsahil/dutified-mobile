import notification from '../../enums/notification'

type notificationType = {
    notificationId: string
    userId: string
    notificationType: notification
    info: {
        userId: string
        userName: string
        userAvatar: string
        actioned: boolean
    }
    creationDate: Date
}

export default notificationType
