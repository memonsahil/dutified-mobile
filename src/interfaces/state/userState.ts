import jobState from './jobState'
import feedbackState from './feedbackState'
import categories from '../../enums/categories'
import chatState from './chatState'
import paymentState from './paymentState'

export default interface userState {
    account: {
        userId: string
        firstName: string
        lastName: string
        countryCode: string
        phoneNumber: string
        emailAddress: string
    }
    profile: {
        profilePicture: string
        description: string
        interests: categories[]
        affiliation: {}
    }
    jobsCreated: jobState[]
    jobsWorked: jobState[]
    chats: chatState[]
    payments: paymentState[]
    feedbacks: feedbackState[]
}
