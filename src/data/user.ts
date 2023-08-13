import firestore from '@react-native-firebase/firestore'
import requestStatus from '../enums/requestStatus'
import UserInterface from '../interfaces/actions/userInterface'
import userState from '../interfaces/state/userState'

class User implements UserInterface {
    async getUserData(userId: string) {
        let userData: userState

        return await firestore()
            .collection('allUsers')
            .where('userDetails.userId', '==', userId)
            .limit(1)
            .get()
            .then((querySnapshot) => {
                userData = querySnapshot.docs[0].data() as userState

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                    data: userData,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }
}

export default new User()
