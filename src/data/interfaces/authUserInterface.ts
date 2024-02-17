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
}
