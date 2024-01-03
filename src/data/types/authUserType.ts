import paymentType from './paymentType'
import chatType from './chatType'
import projectType from './projectType'
import jobType from './jobType'
import feedbackType from './feedbackType'
import transactionType from './transactionType'
import profileType from './profileType'

type authUserType = {
    profile: profileType
    paymentDetails: paymentType
    projectsCreated: projectType[]
    jobsCreated: jobType[]
    projectsWorked: projectType[]
    jobsWorked: jobType[]
    feedbacks: feedbackType[]
    transactions: transactionType[]
    chats: chatType[]
    metaData: {
        creationDate: string
        lastLoginDate: string
        lastTransactionDate: string
    }
}

export default authUserType
