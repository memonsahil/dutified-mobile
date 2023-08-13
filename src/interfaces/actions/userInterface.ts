import requestStatus from '../../enums/requestStatus'
import userState from '../state/userState'

export default interface UserInterface {
    getUserData: (userId: string) => Promise<{
        status: requestStatus
        data?: userState
    }>
}
