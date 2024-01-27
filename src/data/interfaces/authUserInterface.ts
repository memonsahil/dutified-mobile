import categories from '../../enums/categories'
import jobType from '../types/jobType'
import projectType from '../types/projectType'
import agreementAction from '../../enums/agreementAction'
import promiseType from '../types/promiseType'
import authUserType from '../types/authUserType'

export default interface AuthUserInterface {
    signUp: (details: {
        user: authUserType
        password: string
    }) => Promise<promiseType>
    signIn: (details: {
        emailAddress: string
        password: string
    }) => Promise<promiseType>
    getAuthUser: () => Promise<promiseType>
    signOut: () => Promise<promiseType>
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
