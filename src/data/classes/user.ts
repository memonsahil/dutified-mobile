import requestStatus from '../../enums/requestStatus'
import UserInterface from '../interfaces/userInterface'
import promiseType from '../types/promiseType'
import firestore from '@react-native-firebase/firestore'
import userType from '../types/userType'
import auth from '@react-native-firebase/auth'

class User implements UserInterface {
    getUserResults = async (details: {
        searchQuery: string
    }): Promise<promiseType> => {
        try {
            const matchingUsers: userType[] = []
            const querySnapshot = await firestore().collection('users').get()

            querySnapshot.forEach((doc) => {
                let name =
                    doc.data().profile?.firstName +
                    ' ' +
                    doc.data().profile?.lastName
                let interests: string[] = doc.data().profile?.interests

                if (
                    (name
                        .toLowerCase()
                        .includes(details.searchQuery.toLowerCase()) ||
                        interests.some((interest) =>
                            interest
                                .toLocaleLowerCase()
                                .includes(details.searchQuery.toLowerCase())
                        )) &&
                    doc.data().profile?.userId !== auth().currentUser?.uid
                ) {
                    matchingUsers.push(doc.data() as userType)
                }
            })

            if (matchingUsers.length > 0) {
                return {
                    status: requestStatus.SUCCESS,
                    data: matchingUsers,
                }
            } else {
                return { status: requestStatus.ERROR }
            }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    getUser = async (details: { userId: string }): Promise<promiseType> => {
        // Implement get user data logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new User()
