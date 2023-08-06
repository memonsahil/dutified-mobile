import { create } from 'zustand'
import firestore from '@react-native-firebase/firestore'
import userState from '../interfaces/state/userState'
import userActions from '../interfaces/actions/userActions'
import requestStatus from '../enums/requestStatus'

const useUserStore = create<userActions>()(() => ({
    getUserData: async (userId: string) => {
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
    },
}))

export default useUserStore
