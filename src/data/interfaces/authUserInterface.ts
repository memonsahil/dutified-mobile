import categories from '../../enums/categories'
import jobType from '../types/jobType'
import profileType from '../types/profileType'
import projectType from '../types/projectType'
import agreementAction from '../../enums/agreementAction'
import promiseType from '../types/promiseType'

export default interface AuthUserInterface {
    signUp: (details: {
        user: profileType
        password: string
    }) => Promise<promiseType>
    signIn: (details: {
        emailAddress: string
        password: string
    }) => Promise<promiseType>
    getAuthUser: (details: { userId: string }) => Promise<promiseType>
    signOut: () => Promise<promiseType>
    setOnboarded: () => Promise<promiseType>
    setProfilePicture: (details: {
        profilePicture: string
    }) => Promise<promiseType>
    setBio: (details: { bio: string }) => Promise<promiseType>
    setRatePerDay: (details: { ratePerDay: string }) => Promise<promiseType>
    setInterests: (details: { interests: categories[] }) => Promise<promiseType>
    setLinks: (details: { links: string[] }) => Promise<promiseType>
    setPhone: (details: {
        countryCode: string
        phoneNumber: string
    }) => Promise<promiseType>
    setEmail: (details: { emailAddress: string }) => Promise<promiseType>
    setPassword: (details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }) => Promise<promiseType>
    createProject: (details: { project: projectType }) => Promise<promiseType>
    createJob: (details: { job: jobType }) => Promise<promiseType>
    actionAgreement: (details: {
        jobId: string
        action: agreementAction
    }) => Promise<promiseType>
}
