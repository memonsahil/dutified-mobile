import ratings from '../../enums/ratings'

export default interface feebackState {
    userId: string
    userName: string
    feedbackId: string
    feedback: string
    rating: ratings
}
