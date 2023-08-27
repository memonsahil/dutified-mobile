import requestStatus from '../../enums/requestStatus'
import userType from '../types/userType'

export default interface UserInterface {
    getUserData: (userId: string) => Promise<{
        status: requestStatus
        data?: userType
    }>
}
