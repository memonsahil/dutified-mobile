import notifications from '../../enums/notifications'

type notificationType = {
    notificationId: string
    userId: string
    notificationType: notifications
    creationDate: string
}

export default notificationType
