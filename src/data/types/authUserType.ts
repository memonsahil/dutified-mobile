import chatType from './chatType'
import contactType from './contactType'
import feedbackType from './feedbackType'
import jobType from './jobType'
import notificationType from './notificationType'
import paymentType from './paymentType'
import postType from './postType'
import profileType from './profileType'
import projectType from './projectType'
import transactionType from './transactionType'
import userType from './userType'

type authUserType = {
    userId?: string
    profileDetails: profileType
    contactDetails: contactType
    paymentDetails: paymentType
    network: userType[]
    projectsCreated: projectType[]
    projectsWorked: projectType[]
    jobsCreated: jobType[]
    jobsWorked: jobType[]
    postsCreated: postType[]
    feedPosts: postType[]
    feedbacks: feedbackType[]
    chats: chatType[]
    transactions: transactionType[]
    notifications: notificationType[]
    creationDate: string
}

export default authUserType
