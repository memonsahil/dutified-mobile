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

export default mainNavigatorParamList
