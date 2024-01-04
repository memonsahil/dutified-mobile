import requestStatus from '../../enums/requestStatus'
import UserInterface from '../interfaces/userInterface'
import userType from '../types/userType'

class User implements UserInterface {
    getUser = async (details: {
        userId: string
    }): Promise<{
        status: requestStatus
        errorCode?: string
        data?: userType
    }> => {
        // Implement get user data logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new User()
