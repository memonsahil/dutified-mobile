type profileNavigatorParamList = {
    Profile: undefined
    //NewPost: undefined
    //Post: undefined
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

export default profileNavigatorParamList
