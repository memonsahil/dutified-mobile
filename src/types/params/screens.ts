/**
 * @description
 * When a new screen is built, it must be added to the below screens type
 * and its relevant NavigatorParamList in src/types/params/.
 *
 * AppNavigator
 * |-- AuthStackNavigator
 * |    |-- Main
 * |    |-- SignUp
 * |    |-- SignIn
 * |    |-- Reset
 * |    |-- Verification
 * |    |-- Password
 * |    |
 * |    |-- Support
 * |    |-- Contact
 * |    |-- About
 * |    |-- TOS
 * |    |-- PP
 * |
 * |-- MainStackNavigator
 *      |-- DashboardTabNavigator
 *      |   |-- Home
 *      |   |-- Work
 *      |   |-- Profile
 *      |   |-- Settings
 *      |
 *      |-- Project
 *      |-- Job
 *      |-- User
 *      |-- Feedback
 *      |
 *      |-- WorkSetup
 *      |-- Search
 *      |
 *      |-- AddProject
 *      |-- AddJob
 *      |
 *      |-- Chats
 *      |-- Chat
 *      |
 *      |-- EditProfilePicture
 *      |-- EditPhoneNumber
 *      |-- EditEmailAddress
 *      |-- EditPassword
 *      |
 *      |-- Support
 *      |-- Contact
 *      |-- About
 *      |-- TOS
 *      |-- PP
 */

type screens = {
    Main: undefined
    SignUp: undefined
    SignIn: undefined
    Reset: undefined
    Verification: undefined
    Password: undefined

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

    WorkSetup: undefined
    Search: undefined

    AddProject: undefined
    AddJob: {
        projectId: string
        projectName: string
        jobCreatorId: string
        jobCreator: string
    }

    Chats: undefined
    Chat: {
        receiverUserId: string
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
