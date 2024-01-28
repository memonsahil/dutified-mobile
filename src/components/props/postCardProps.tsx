import attachmentType from '../../data/types/attachmentType'
import commentType from '../../data/types/commentType'

type postCardProps = {
    postId: string
    content: string
    userId: string
    userName: string
    userAvatar: string
    date: string
    comments?: commentType[]
    attachments?: attachmentType[]
}

export default postCardProps
