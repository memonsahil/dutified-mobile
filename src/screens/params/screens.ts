/**
 * @description
 * When a new screen component is added to App.tsx, it must be added to the
 * below screens type and its relevant NavigatorParamList.
 */

type screens = {
    // Auth screens
    Main: undefined
    SignUp: undefined
    SignIn: undefined
    Reset: undefined
    Verification: undefined
    Password: undefined

    // TabBar screens
    Feed: undefined
    Chats: undefined
    Work: undefined
    Profile: undefined
    Settings: undefined

    // Main screens
    Search: undefined
    Create: undefined

    EditProfilePicture: undefined
    EditPhoneNumber: undefined
    EditEmailAddress: undefined
    EditPassword: undefined

    AddJob: {
        projectId: string
        projectName: string
        jobCreatorId: string
        jobCreator: string
    }
    AddProject: undefined
    AddPost: undefined
    Attach: undefined

    Job: {
        jobId: string
    }
    Project: {
        projectId: string
    }

    User: {
        userId: string
    }
    Feedback: undefined

    Chat: {
        receiverUserId: string
    }

    // Common screens
    Support: undefined
    Contact: undefined
    About: undefined
    TOS: undefined
    PP: undefined
}

export default screens
