type profileNavigatorParamList = {
    Profile: undefined
    Feedback: undefined
    AddProject: undefined
    AddJob: {
        projectId: string
        projectName: string
        jobCreatorId: string
        jobCreator: string
    }
    Project: {
        projectId: string
    }
    Job: {
        jobId: string
    }
    User: {
        userId: string
    }
}

export default profileNavigatorParamList
