import requestStatus from '../../enums/requestStatus'
import UserInterface from '../interfaces/userInterface'
import promiseType from '../types/promiseType'
import firestore from '@react-native-firebase/firestore'
import userType from '../types/userType'
import auth from '@react-native-firebase/auth'
import feedbackType from '../types/feedbackType'

class User implements UserInterface {
    getUser = async (details: { userId: string }): Promise<promiseType> => {
        try {
            const userData = await firestore()
                .collection('users')
                .doc(details.userId)
                .get()

            if (userData.exists) {
                return {
                    status: requestStatus.SUCCESS,
                    data: userData.data() as userType,
                }
            } else {
                return { status: requestStatus.ERROR }
            }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    getUserFeedbacks = async (details: {
        userId: string
    }): Promise<promiseType> => {
        try {
            const doc = await firestore()
                .collection('users')
                .doc(details.userId)
                .get()

            if (doc.exists) {
                return {
                    status: requestStatus.SUCCESS,
                    data: doc.data()?.feedbacks as feedbackType[],
                }
            } else {
                return { status: requestStatus.ERROR }
            }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    getUserNetwork = async (details: {
        userId: string
    }): Promise<promiseType> => {
        try {
            const doc = await firestore()
                .collection('users')
                .doc(details.userId)
                .get()

            if (doc.exists) {
                return {
                    status: requestStatus.SUCCESS,
                    data: doc.data()?.Network as userType[],
                }
            } else {
                return { status: requestStatus.ERROR }
            }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

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
}

export default new User()
