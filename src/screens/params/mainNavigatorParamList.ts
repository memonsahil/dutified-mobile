import feedbackType from '../../data/types/feedbackType'
import userType from '../../data/types/userType'

type mainNavigatorParamList = {
    Dashboard: undefined
    Create: undefined
    Job: {
        jobId: string
    }
    Project: {
        projectId: string
    }
    User: {
        userId: string
    }
    Feedback: {
        feedbacks: feedbackType[]
    }
    Network: {
        network: userType[]
    }
    Chat: {
        userId: string
    }
    Search: undefined
    AddJob: {
        projectId: string
        projectName: string
        jobCreatorId: string
        jobCreator: string
    }
    AddProject: undefined
    AddPost: undefined
    Attach: undefined
    Notifications: undefined
    EditProfilePicture: undefined
    EditBio: undefined
    EditRate: undefined
    EditInterests: undefined
    EditLinks: undefined
    Transactions: undefined
    EditPayment: undefined
    EditPhoneNumber: undefined
    EditEmailAddress: undefined
    EditPassword: undefined
    Support: undefined
    Contact: undefined
    About: undefined
    TOS: undefined
    PP: undefined
}

export default mainNavigatorParamList
