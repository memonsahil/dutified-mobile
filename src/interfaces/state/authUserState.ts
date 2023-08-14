import userState from './userState'
import workSetupState from './workSetupState'
import chatState from './chatState'

export default interface authUserState extends userState {
    workSetup: workSetupState
    chats: chatState[]
}
