import ratings from '../../enums/ratings'

type feedBackType = {
    userId: string
    userName: string
    feedbackId: string
    feedbackTitle: string
    feedback: string
    rating: ratings
    feedbackDate: string
}

export default feedBackType
