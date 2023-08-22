import userState from './userState'
import workSetupState from './workSetupState'

export default interface authUserState extends userState {
    workSetup: workSetupState
}
