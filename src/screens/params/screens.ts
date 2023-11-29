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
    User: {
        userId: string
    }
    Feedback: undefined
    Network: undefined
    Chat: {
        receiverUserId: string
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
    EditProfilePicture: undefined
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
