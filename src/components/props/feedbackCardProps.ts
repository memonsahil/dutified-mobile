import ratings from '../../enums/ratings'

type feedbackCardProps = {
    userId: string
    userName: string
    feedbackId: string
    feedbackTitle: string
    feedback: string
    rating: ratings
    feedbackDate: string
}

export default feedbackCardProps
