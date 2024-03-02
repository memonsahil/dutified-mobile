type postType = {
    postId: string
    creatorId: string
    creatorName: string
    creatorAvatar: string
    images: string[]
    postDesc: string
    attachments: {
        id: string
        type: string
        title: string
    }[]
    creationDate: Date
}

export default postType
