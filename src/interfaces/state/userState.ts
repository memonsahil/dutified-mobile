import userDetailsState from './userDetailsState'
import projectState from './projectState'
import jobState from './jobState'
import ratings from '../../enums/ratings'

export default interface userState {
    userDetails: userDetailsState
    projects: projectState[]
    jobs: jobState[]
    feedbacks: {
        userId: string
        userName: string
        feedbackId: string
        feedback: string
        rating: ratings
    }[]
}
