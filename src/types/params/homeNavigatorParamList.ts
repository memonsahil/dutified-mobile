type homeNavigatorParamList = {
    Home: undefined
    //NewPost: undefined
    //Post: undefined
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
    Chats: undefined
    Chat: {
        receiverUserId: string
    }
}

export default homeNavigatorParamList
