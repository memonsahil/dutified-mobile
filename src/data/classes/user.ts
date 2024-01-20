import requestStatus from '../../enums/requestStatus'
import UserInterface from '../interfaces/userInterface'
import promiseType from '../types/promiseType'

class User implements UserInterface {
    getUser = async (details: { userId: string }): Promise<promiseType> => {
        // Implement get user data logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new User()
