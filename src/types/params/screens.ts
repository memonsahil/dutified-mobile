/**
 * @description
 * When a new screen is created, it must be added to the below screens type
 * and to the paramList type of its relevant navigator.
 *
 * Screens are organised in the following order:
 *
 * AppNavigator
 * |-- AuthStackNavigator
 * |    |-- Main
 * |    |-- SignUp
 * |    |-- SignIn
 * |    |-- Reset
 * |    |-- Verification
 * |    |-- Password
 * |    |-- Support
 * |    |-- Contact
 * |    |-- About
 * |    |-- TOS
 * |    |-- PP
 * |-- MainStackNavigator
 *      |-- DashboardTabNavigator
 *      |   |-- HomeStackNavigator
 *      |   |       |-- Home
 *      |   |-- WorkStackNavigator
 *      |   |       |-- Work
 *      |   |       |-- WorkSetup
 *      |   |       |-- Search
 *      |   |-- ProfileStackNavigator
 *      |   |       |-- Profile
 *      |   |-- SettingsStackNavigator
 *      |           |-- Settings
 *      |           |-- EditProfilePicture
 *      |           |-- EditPhoneNumber
 *      |           |-- EditEmailAddress
 *      |           |-- EditPassword
 *      |-- Project
 *      |-- Job
 *      |-- User
 *      |-- Feedback
 *      |-- AddProject
 *      |-- AddJob
 *      |-- Chats
 *      |-- Chat
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
    WorkSetup: undefined
    Search: undefined
    Profile: undefined
    Settings: undefined
    EditProfilePicture: undefined
    EditPhoneNumber: undefined
    EditEmailAddress: undefined
    EditPassword: undefined

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

    Support: undefined
    Contact: undefined
    About: undefined
    TOS: undefined
    PP: undefined
}

export default screens
