type mainNavigatorParamList = {
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

export default mainNavigatorParamList
