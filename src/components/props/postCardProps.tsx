type postCardProps = {
    postId: string
    content: string
    userId: string
    userName: string
    userAvatar: string
    date: string
    comments: string
    attachments?: {
        id: string
        title: string
        type: string
    }[]
}

export default postCardProps
