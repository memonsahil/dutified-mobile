import commentType from '../../data/types/commentType'

type commentsModalProps = {
    visible: boolean
    onClose: () => void
    comments: commentType[]
}

export default commentsModalProps
