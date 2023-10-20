import attachmentType from '../../data/types/attachmentType'

type postCardProps = {
    postId: string
    content: string
    userId: string
    userName: string
    userAvatar: string
    date: string
    comments: string
    attachments?: attachmentType[]
}

export default postCardProps
