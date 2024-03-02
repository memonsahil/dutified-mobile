import promiseType from '../types/promiseType'
import userType from '../types/userType'

export default interface AuthUserInterface {
    signUp: (details: {
        user: userType
        password: string
    }) => Promise<promiseType>
    signIn: (details: {
        emailAddress: string
        password: string
    }) => Promise<promiseType>
    signOut: () => Promise<promiseType>
    setProfilePicture: (details: {
        profilePicture: string
    }) => Promise<promiseType>
    setBio: (details: { bio: string }) => Promise<promiseType>
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
