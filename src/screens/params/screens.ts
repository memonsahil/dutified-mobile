/**
 * @description
 * When a new screen component is added to App.tsx, it must be added to the
 * below screens type and its relevant NavigatorParamList.
 */

import feedbackType from '../../data/types/feedbackType'
import userType from '../../data/types/userType'

type screens = {
    // Auth screens
    Info: undefined
    SignUp: undefined
    SignIn: undefined
    Reset: undefined
    Verification: undefined
    Password: undefined

    // Dashboard screens
    Feed: undefined
    Chats: undefined
    Work: undefined
    Profile: undefined
    Settings: undefined

    // Main screens
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
    EditPayment: undefined
    Transactions: undefined
    EditPhoneNumber: undefined
    EditEmailAddress: undefined
    EditPassword: undefined

    // Auth & Main screens
    Support: undefined
    Contact: undefined
    About: undefined
    TOS: undefined
    PP: undefined
}

export default screens
