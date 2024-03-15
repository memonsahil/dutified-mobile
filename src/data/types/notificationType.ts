import notification from '../../enums/notification'

type notificationType = {
    notificationId: string
    userId: string
    notificationType: notification
    creationDate: string
}

export default notificationType
