import ratings from '../../enums/ratings'

type feedbackCardProps = {
    userId: string
    userName: string
    feedbackId: string
    feedback: string
    rating: ratings
}

export default feedbackCardProps
