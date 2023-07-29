import requestStatus from '../../enums/requestStatus'
import userState from '../state/userState'

export default interface userActions {
    getUserData: (userId: string) => Promise<{
        status: requestStatus
        errorCode?: string
        data?: userState
    }>
}
