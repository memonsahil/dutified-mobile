import attachmentType from './attachmentType'
import commentType from './commentType'

type postType = {
    postId: string
    content: string
    userId: string
    userName: string
    userAvatar: string
    date: string
    comments?: commentType[]
    attachments?: attachmentType[]
}

export default postType
