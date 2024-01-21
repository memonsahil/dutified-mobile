import AuthUserInterface from '../interfaces/authUserInterface'
import jobType from '../types/jobType'
import requestStatus from '../../enums/requestStatus'
import projectType from '../types/projectType'
import categories from '../../enums/categories'
import agreementAction from '../../enums/agreementAction'
import auth from '@react-native-firebase/auth'
import promiseType from '../types/promiseType'
import firestore from '@react-native-firebase/firestore'
import authUserType from '../types/authUserType'

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

            if (response.user) {
                await firestore()
                    .collection('users')
                    .doc(details.user.profile.userId)
                    .set(details.user)

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

    getAuthUser = async (details: { userId: string }): Promise<promiseType> => {
        // Implement get user data logic here
        return { status: requestStatus.SUCCESS }
    }

    setProfilePicture = async (details: {
        profilePicture: string
    }): Promise<promiseType> => {
        // Implement set profile picture logic here
        return { status: requestStatus.SUCCESS }
    }

    setBio = async (details: { bio: string }): Promise<promiseType> => {
        // Implement set bio logic here
        return { status: requestStatus.SUCCESS }
    }

    setRatePerDay = async (details: {
        ratePerDay: string
    }): Promise<promiseType> => {
        // Implement set rate per day logic here
        return { status: requestStatus.SUCCESS }
    }

    setInterests = async (details: {
        interests: categories[]
    }): Promise<promiseType> => {
        // Implement set interests logic here
        return { status: requestStatus.SUCCESS }
    }

    setLinks = async (details: { links: string[] }): Promise<promiseType> => {
        // Implement set links logic here
        return { status: requestStatus.SUCCESS }
    }

    setPhone = async (details: {
        countryCode: string
        phoneNumber: string
    }): Promise<promiseType> => {
        // Implement set phone logic here
        return { status: requestStatus.SUCCESS }
    }

    setEmail = async (details: {
        emailAddress: string
    }): Promise<promiseType> => {
        // Implement set email logic here
        return { status: requestStatus.SUCCESS }
    }

    setPassword = async (details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }): Promise<promiseType> => {
        // Implement set password logic here
        return { status: requestStatus.SUCCESS }
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
