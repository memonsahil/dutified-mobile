import requestStatus from '../../enums/requestStatus'
import userType from '../types/userType'

export default interface UserInterface {
    getUser: (details: { userId: string }) => Promise<{
        status: requestStatus
        errorCode?: string
        data?: userType
    }>
}
