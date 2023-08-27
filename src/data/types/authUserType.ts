import { IMessage } from 'react-native-gifted-chat'
import userType from './userType'

type authUserType = {
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
}

export default authUserType
