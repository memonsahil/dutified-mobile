/**
 * @description
 * When a new screen component is added to App.tsx, it must be added to the
 * below screens type and its relevant NavigatorParamList.
 */

type screens = {
    Main: undefined
    SignUp: undefined
    SignIn: undefined
    Reset: undefined
    Verification: undefined
    Password: undefined
    Feed: undefined
    Chats: undefined
    Work: undefined
    Profile: undefined
    Settings: undefined
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
    Search: undefined
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
