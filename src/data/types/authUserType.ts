import chatType from './chatType'
import feedbackType from './feedbackType'
import jobType from './jobType'
import notificationType from './notificationType'
import postType from './postType'
import projectType from './projectType'
import transactionType from './transactionType'
import userType from './userType'

type authUserType = {
    userId?: string
    userName: string
    userAvatar: string
    countryCode: string
    phoneNumber: string
    emailAddress: string
    cardNumber: string
    securityCode: string
    expiryMonth: string
    expiryYear: string
    userDesc: string
    categories: string[]
    links: string[]
    notifications: notificationType[]
    network: userType[]
    projectsCreated: projectType[]
    projectsWorked: projectType[]
    jobsCreated: jobType[]
    jobsWorked: jobType[]
    postsCreated: postType[]
    userFeedPosts: postType[]
    chats: chatType[]
    transactions: transactionType[]
    feedbacks: feedbackType[]
    creationDate: string
}

export default authUserType
