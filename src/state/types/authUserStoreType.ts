import authUserType from '../../data/types/authUserType'
import chatType from '../../data/types/chatType'
import paymentType from '../../data/types/paymentType'
import userType from '../../data/types/userType'

type authUserStoreType = {
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
        metaData: {
            creationDate: string
            lastLoginDate: string
            lastTransactionDate: string
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
    updateAuthUser: (authUser: authUserType) => void
    removeAuthUser: () => void
}

export default authUserStoreType
