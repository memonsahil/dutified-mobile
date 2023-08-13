import userDetailsState from './userDetailsState'
import projectState from './projectState'
import jobState from './jobState'
import feedbackState from './feedbackState'

export default interface userState {
    userDetails: userDetailsState
    projects: projectState[]
    jobs: jobState[]
    feedbacks: feedbackState[]
}
