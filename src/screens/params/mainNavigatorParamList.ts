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
    Feedback: undefined
    Network: undefined
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
