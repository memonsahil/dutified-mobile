import categories from '../../enums/categories'
import requestStatus from '../../enums/requestStatus'
import authUserType from '../types/authUserType'
import jobType from '../types/jobType'
import profileType from '../types/profileType'
import projectType from '../types/projectType'
import agreementAction from '../../enums/agreementAction'

export default interface AuthUserInterface {
    signUp: (
        details: profileType
    ) => Promise<{ status: requestStatus; errorCode?: string }>
    signIn: (details: {
        emailAddress: string
        password: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    getAuthUser: (details: { userId: string }) => Promise<{
        status: requestStatus
        errorCode?: string
        data?: authUserType
    }>
    signOut: () => Promise<{ status: requestStatus; errorCode?: string }>
    setProfilePicture: (details: {
        profilePicture: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    setBio: (details: {
        bio: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    setRatePerDay: (details: { ratePerDay: string }) => Promise<{
        status: requestStatus
        errorCode?: string
    }>
    setInterests: (details: { interests: categories[] }) => Promise<{
        status: requestStatus
        errorCode?: string
    }>
    setLinks: (details: { links: string[] }) => Promise<{
        status: requestStatus
        errorCode?: string
    }>
    setPhone: (details: {
        countryCode: string
        phoneNumber: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    setEmail: (details: {
        emailAddress: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    setPassword: (details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    createProject: (details: {
        project: projectType
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    createJob: (details: {
        job: jobType
    }) => Promise<{ status: requestStatus; errorCode?: string }>
    actionAgreement: (details: {
        jobId: string
        action: agreementAction
    }) => Promise<{
        status: requestStatus
        errorCode?: string
    }>
}
