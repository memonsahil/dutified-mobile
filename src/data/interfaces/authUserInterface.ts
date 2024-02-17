import jobType from '../types/jobType'
import projectType from '../types/projectType'
import agreementAction from '../../enums/agreementAction'
import promiseType from '../types/promiseType'
import authUserType from '../types/authUserType'
import paymentType from '../types/paymentType'
import postType from '../types/postType'
import commentType from '../types/commentType'

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
    setInterests: (details: { interests: string[] }) => Promise<promiseType>
    setLinks: (details: { links: string[] }) => Promise<promiseType>
    setPhone: (details: {
        countryCode: string
        phoneNumber: string
    }) => Promise<promiseType>
    setEmail: (details: {
        oldEmail: string
        password: string
        newEmail: string
    }) => Promise<promiseType>
    setPassword: (details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }) => Promise<promiseType>
    setPaymentDetails: (details: {
        paymentDetails: paymentType
    }) => Promise<promiseType>
    createProject: (details: { project: projectType }) => Promise<promiseType>
    createJob: (details: { job: jobType }) => Promise<promiseType>
    createPost: (details: { post: postType }) => Promise<promiseType>
    getUserFeed: () => Promise<promiseType>
    createComment: (details: { comment: commentType }) => Promise<promiseType>
    actionAgreement: (details: {
        jobId: string
        action: agreementAction
    }) => Promise<promiseType>
}
