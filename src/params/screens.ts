/**
 * @description
 * When a new screen component is added to App.tsx, it must be added to the
 * below screens type and its relevant NavigatorParamList in src/types/params/.
 */

type screens = {
    Main: undefined
    SignUp: undefined
    SignIn: undefined
    Reset: undefined
    Verification: undefined
    Password: undefined
    Home: undefined
    Chats: undefined
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
    Support: undefined
    Contact: undefined
    About: undefined
    TOS: undefined
    PP: undefined
}

export default screens
