import userState from './userState'
import feedbackState from './feedbackState'
import workSetupState from './workSetupState'

export default interface authUserState extends userState {
    workSetup: workSetupState
    feedbacks: feedbackState[]
}
