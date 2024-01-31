import AuthUserInterface from '../interfaces/authUserInterface'
import jobType from '../types/jobType'
import requestStatus from '../../enums/requestStatus'
import projectType from '../types/projectType'
import agreementAction from '../../enums/agreementAction'
import auth from '@react-native-firebase/auth'
import promiseType from '../types/promiseType'
import firestore from '@react-native-firebase/firestore'
import authUserType from '../types/authUserType'
import paymentType from '../types/paymentType'

class AuthUser implements AuthUserInterface {
    signUp = async (details: {
        user: authUserType
        password: string
    }): Promise<promiseType> => {
        try {
            const response = await auth().createUserWithEmailAndPassword(
                details.user.profile.emailAddress,
                details.password
            )

            const updatedUser = {
                ...details.user,
                profile: {
                    ...details.user.profile,
                    userId: response.user?.uid,
                },
            }

            if (response.user) {
                await firestore()
                    .collection('users')
                    .doc(response.user.uid)
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
                return { status: requestStatus.SUCCESS }
            } else {
                return {
                    status: requestStatus.ERROR,
                }
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

    getAuthUser = async (): Promise<promiseType> => {
        try {
            const response = await firestore()
                .collection('users')
                .doc(auth().currentUser?.uid)
                .get()

            if (response) {
                return {
                    status: requestStatus.SUCCESS,
                    data: response.data(),
                }
            } else {
                return { status: requestStatus.ERROR }
            }
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
                    'profile.profilePicture': details.profilePicture,
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
                    'profile.bio': details.bio,
                })

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    setRatePerDay = async (details: {
        ratePerDay: string
    }): Promise<promiseType> => {
        try {
            await firestore()
                .collection('users')
                .doc(auth().currentUser?.uid)
                .update({
                    'profile.ratePerDay': details.ratePerDay,
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
                    'profile.interests': details.interests,
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
                    'profile.links': details.links,
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
                    'profile.countryCode': details.countryCode,
                    'profile.phoneNumber': details.phoneNumber,
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
                    'profile.emailAddress': details.newEmail,
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
            await auth().signInWithEmailAndPassword(
                details.emailAddress,
                details.currentPassword
            )
            await auth().currentUser?.updatePassword(details.newPassword)

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    setPaymentDetails = async (details: { paymentDetails: paymentType }) => {
        try {
            await firestore()
                .collection('users')
                .doc(auth().currentUser?.uid)
                .update({
                    paymentDetails: details.paymentDetails,
                })

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    createProject = async (details: {
        project: projectType
    }): Promise<promiseType> => {
        // Implement create project logic here
        return { status: requestStatus.SUCCESS }
    }

    createJob = async (details: { job: jobType }): Promise<promiseType> => {
        // Implement create job logic here
        return { status: requestStatus.SUCCESS }
    }

    actionAgreement = async (details: {
        jobId: string
        action: agreementAction
    }): Promise<promiseType> => {
        // Implement accept job logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new AuthUser()
