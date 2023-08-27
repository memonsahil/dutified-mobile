import requestStatus from '../../enums/requestStatus'
import authUserType from '../types/authUserType'
import jobType from '../types/jobType'

export default interface AuthUserInterface {
    signUp: (details: {
        firstName: string
        lastName: string
        countryCode: string
        phoneNumber: string
        emailAddress: string
        password: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    signIn: (details: {
        emailAddress: string
        password: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    getAuthUser: () => Promise<{
        status: requestStatus
        data?: authUserType
    }>
    signOut: () => Promise<{ status: requestStatus }>
    setProfilePicture: (
        profilePicture: string
    ) => Promise<{ status: requestStatus }>
    setPhone: (details: {
        countryCode: string
        phoneNumber: string
    }) => Promise<{ status: requestStatus }>
    setEmail: (emailAddress: string) => Promise<{ status: requestStatus }>
    setPassword: (details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }) => Promise<{ status: requestStatus }>
    createJob: (details: jobType) => Promise<{ status: requestStatus }>
    acceptJob: (details: jobType) => Promise<{ status: requestStatus }>
}
