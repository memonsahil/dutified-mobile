import AuthUserInterface from '../interfaces/authUserInterface'
import requestStatus from '../../enums/requestStatus'
import auth from '@react-native-firebase/auth'
import promiseType from '../types/promiseType'
import firestore from '@react-native-firebase/firestore'
import userType from '../types/userType'

class AuthUser implements AuthUserInterface {
    signUp = async (details: {
        user: userType
        password: string
    }): Promise<promiseType> => {
        try {
            const response = await auth().createUserWithEmailAndPassword(
                details.user.emailAddress,
                details.password
            )

            const updatedUser = {
                ...details.user,
                profile: {
                    ...details.user,
                    userId: response.user?.uid,
                },
            }

            if (response.user) {
                await firestore()
                    .collection('users')
                    .doc(response.user?.uid)
                    .set(updatedUser)

                return { status: requestStatus.SUCCESS }
            } else {
                return { status: requestStatus.ERROR }
            }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    signIn = async (details: {
        emailAddress: string
        password: string
    }): Promise<promiseType> => {
        try {
            const response = await auth().signInWithEmailAndPassword(
                details.emailAddress,
                details.password
            )

            if (response.user) {
                return {
                    status: requestStatus.SUCCESS,
                    data: response.user?.uid,
                }
            } else {
                return { status: requestStatus.ERROR }
            }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    signOut = async (): Promise<promiseType> => {
        try {
            await auth().signOut()

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    setProfilePicture = async (details: {
        profilePicture: string
    }): Promise<promiseType> => {
        try {
            await firestore()
                .collection('users')
                .doc(auth().currentUser?.uid)
                .update({
                    userAvatar: details.profilePicture,
                })

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    setBio = async (details: { bio: string }): Promise<promiseType> => {
        try {
            await firestore()
                .collection('users')
                .doc(auth().currentUser?.uid)
                .update({
                    userDesc: details.bio,
                })

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    setInterests = async (details: {
        interests: string[]
    }): Promise<promiseType> => {
        try {
            await firestore()
                .collection('users')
                .doc(auth().currentUser?.uid)
                .update({
                    categories: details.interests,
                })

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    setLinks = async (details: { links: string[] }): Promise<promiseType> => {
        try {
            await firestore()
                .collection('users')
                .doc(auth().currentUser?.uid)
                .update({
                    links: details.links,
                })

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    setPhone = async (details: {
        countryCode: string
        phoneNumber: string
    }): Promise<promiseType> => {
        try {
            await firestore()
                .collection('users')
                .doc(auth().currentUser?.uid)
                .update({
                    countryCode: details.countryCode,
                    phoneNumber: details.phoneNumber,
                })

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    setEmail = async (details: {
        oldEmail: string
        password: string
        newEmail: string
    }): Promise<promiseType> => {
        try {
            const credential = auth.EmailAuthProvider.credential(
                details.oldEmail,
                details.password
            )

            await auth().currentUser?.reauthenticateWithCredential(credential)
            await auth().currentUser?.updateEmail(details.newEmail)
            await firestore()
                .collection('users')
                .doc(auth().currentUser?.uid)
                .update({
                    emailAddress: details.newEmail,
                })

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    setPassword = async (details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }): Promise<promiseType> => {
        try {
            const credential = auth.EmailAuthProvider.credential(
                details.emailAddress,
                details.currentPassword
            )

            await auth().currentUser?.reauthenticateWithCredential(credential)
            await auth().currentUser?.updatePassword(details.newPassword)

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }
}

export default new AuthUser()
