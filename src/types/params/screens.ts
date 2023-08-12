/**
 * @description
 * When a new screen is built, it must be added to the below screens type
 * and its relevant NavigatorParamList in src/types/params/.
 */

type screens = {
    Main: undefined
    SignUp: undefined
    SignIn: undefined
    Reset: undefined
    Verification: undefined
    Password: undefined
    Support: undefined
    Contact: undefined
    About: undefined
    TOS: undefined
    PP: undefined
    Dashboard: undefined
    Home: undefined
    Work: undefined
    Profile: undefined
    Settings: undefined
    Project: {
        projectId: string
    }
    Job: {
        jobId: string
    }
    User: {
        userId: string
    }
    Feedback: undefined
    Chats: undefined
    Chat: {
        receiverUserId: string
    }
    WorkSetup: undefined
    Search: undefined
    AddProject: undefined
    AddJob: {
        projectId: string
        projectName: string
        jobCreatorId: string
        jobCreator: string
    }
    EditProfilePicture: undefined
    EditPhoneNumber: undefined
    EditEmailAddress: undefined
    EditPassword: undefined
}

export default screens
