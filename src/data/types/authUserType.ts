import userType from './userType'
import paymentType from './paymentType'
import chatType from './chatType'

type authUserType = {
    account: {
        identity: {
            userId: string
            firstName: string
            lastName: string
            countryCode: string
            phoneNumber: string
            emailAddress: string
        }
        affiliation?: {
            orgName: string
            orgDesc: string
            website: string
            userTitle: string
        }
        paymentDetails?: {
            cardHolderName: string
            cardNumber: string
            expiryDate: string
            cvc: string
        }
        stats: {
            creationDate: string
            lastLoginDate: string
        }
    }
    profile: userType['profile']
    projectsCreated: userType['projectsCreated']
    projectsWorked: userType['projectsWorked']
    jobsCreated: userType['jobsCreated']
    jobsWorked: userType['jobsWorked']
    feedbacks: userType['feedbacks']
    payments: paymentType[]
    chats: chatType[]
}

export default authUserType
