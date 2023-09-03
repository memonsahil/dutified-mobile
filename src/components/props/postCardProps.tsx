type postCardProps = {
    postId: string
    content: string
    userId: string
    userName: string
    userAvatar: string
    date: string
    comments: string
    jobAttachments: {
        jobId: string
        jobName: string
    }[]
}

export default postCardProps
