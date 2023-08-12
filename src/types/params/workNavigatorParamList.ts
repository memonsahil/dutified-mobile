type workNavigatorParamList = {
    Work: undefined
    WorkSetup: undefined
    Search: undefined
    AddProject: undefined
    AddJob: {
        projectId: string
        projectName: string
        jobCreatorId: string
        jobCreator: string
    }
    //AllProjects: undefined
    //AllJobs: undefined
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
}

export default workNavigatorParamList
