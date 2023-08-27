import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import AuthUserInterface from '../interfaces/authUserInterface'
import jobType from '../types/jobType'
import requestStatus from '../../enums/requestStatus'

class AuthUser implements AuthUserInterface {
    async signUp(details: {
        firstName: string
        lastName: string
        countryCode: string
        phoneNumber: string
        emailAddress: string
        accPassword: string
    }) {
        return await auth()
            .createUserWithEmailAndPassword(
                details.emailAddress,
                details.accPassword
            )
            .then(() => {
                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch((error) => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                    errorCode: error.code,
                })
            })
    }

    async signIn(details: { emailAddress: string; accPassword: string }) {
        return await auth()
            .signInWithEmailAndPassword(
                details.emailAddress,
                details.accPassword
            )
            .then(() => {
                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch((error) => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                    errorCode: error.code,
                })
            })
    }

    getAuthUser() {}

    async signOut() {
        return await auth()
            .signOut()
            .then(() => {
                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    setProfilePicture(profilePicture: string) {}

    setPhone(details: { countryCode: string; phoneNumber: string }) {}

    setEmail(emailAddress: string) {}

    async setPassword(details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }) {
        let user: FirebaseAuthTypes.User = auth()
            .currentUser as FirebaseAuthTypes.User
        let credential: FirebaseAuthTypes.AuthCredential =
            auth.EmailAuthProvider.credential(
                details.emailAddress,
                details.currentPassword
            )

        return await user
            .reauthenticateWithCredential(credential)
            .then(() => {
                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    createJob(details: jobType) {}

    acceptJob(details: jobType) {}
}

export default new AuthUser()
