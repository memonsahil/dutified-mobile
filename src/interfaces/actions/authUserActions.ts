import requestStatus from '../../enums/requestStatus'
import projectState from '../state/projectState'
import jobState from '../state/jobState'

export default interface authUserActions {
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
    signOut: () => Promise<{ status: requestStatus; errorCode?: string }>
    getAuthUserData: () => Promise<{
        status: requestStatus
        errorCode?: string
    }>
    updateImage: (
        imageSrc: string
    ) => Promise<{ status: requestStatus; errorCode?: string }>
    updatePhone: (details: {
        countryCode: string
        phoneNumber: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    updateEmail: (
        emailAddress: string
    ) => Promise<{ status: requestStatus; errorCode?: string }>
    updatePassword: (details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    addProject: (
        details: projectState
    ) => Promise<{ status: requestStatus; errorCode?: string }>
    addJob: (
        details: jobState
    ) => Promise<{ status: requestStatus; errorCode?: string }>
    saveWorkSetup: (details: {
        preferredCategories: string[]
        totalJobs: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
}
