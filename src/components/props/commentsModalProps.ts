import commentType from '../../data/types/commentType'

type commentsModalProps = {
    visible: boolean
    onClose: () => void
    comments: commentType[]
    postId: string
}

export default commentsModalProps
