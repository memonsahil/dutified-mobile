import requestStatus from '../../enums/requestStatus'
import authUserState from '../state/authUserState'
import projectState from '../state/projectState'
import jobState from '../state/jobState'

export default interface AuthUserInterface {
    signUp: (details: {
        firstName: string
        lastName: string
        countryCode: string
        phoneNumber: string
        emailAddress: string
        accPassword: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    signIn: (details: {
        emailAddress: string
        accPassword: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    getAuthUser: () => Promise<{
        status: requestStatus
        data?: authUserState
    }>
    signOut: () => Promise<{ status: requestStatus }>
    updateImage: (imageSrc: string) => Promise<{ status: requestStatus }>
    updatePhone: (details: {
        countryCode: string
        phoneNumber: string
    }) => Promise<{ status: requestStatus }>
    updateEmail: (emailAddress: string) => Promise<{ status: requestStatus }>
    updatePassword: (details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }) => Promise<{ status: requestStatus }>
    updateWorkSetup: (details: {
        preferredCategories: string[]
        totalJobs: string
    }) => Promise<{ status: requestStatus }>
    addProject: (details: projectState) => Promise<{ status: requestStatus }>
    addJob: (details: jobState) => Promise<{ status: requestStatus }>
}
