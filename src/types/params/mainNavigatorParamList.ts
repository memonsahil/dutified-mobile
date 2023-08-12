type mainNavigatorParamList = {
    Dashboard: undefined
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

export default mainNavigatorParamList
