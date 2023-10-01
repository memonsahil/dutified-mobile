import ratings from '../../enums/ratings'

type feedBackType = {
    userId: string
    userName: string
    feedbackId: string
    feedback: string
    rating: ratings
}

export default feedBackType
