import authUserType from '../../data/types/authUserType'
import userType from '../../data/types/userType'
import { IMessage } from 'react-native-gifted-chat'

type authUserStore = {
    account: {
        userId: string
        firstName: string
        lastName: string
        countryCode: string
        phoneNumber: string
        emailAddress: string
    }
    profile: userType['profile']
    jobsCreated: userType['jobsCreated']
    jobsWorked: userType['jobsWorked']
    feedbacks: userType['feedbacks']
    chats: {
        chatId: string
        senderUserId: string
        receiverUserId: string
        messages: IMessage[]
    }[]
    payments: {
        paymentId: string
        jobId: string
        jobName: string
        jobCreatorId: string
        jobCreator: string
        jobWorkerId: string
        jobWorker: string
        amount: string
    }[]
    updateAuthUser: (authUser: authUserType) => void
    removeAuthUser: () => void
}

export default authUserStore
