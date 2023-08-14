import userState from './userState'
import feedbackState from './feedbackState'
import workSetupState from './workSetupState'
import chatState from './chatState'

export default interface authUserState extends userState {
    workSetup: workSetupState
    feedbacks: feedbackState[]
    chats: chatState[]
}
