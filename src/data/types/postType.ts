import attachmentType from './attachmentType'
import commentType from './commentType'

type postType = {
    postId: string
    creatorId: string
    creatorName: string
    creatorAvatar: string
    images: string[]
    postDesc: string
    attachments: attachmentType[]
    comments: commentType[]
    creationDate: string
}

export default postType
