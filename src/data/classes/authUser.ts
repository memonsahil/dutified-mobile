import AuthUserInterface from '../interfaces/authUserInterface'
import jobType from '../types/jobType'
import requestStatus from '../../enums/requestStatus'
import projectType from '../types/projectType'
import profileType from '../types/profileType'
import categories from '../../enums/categories'
import agreementAction from '../../enums/agreementAction'
import authUserType from '../types/authUserType'

class AuthUser implements AuthUserInterface {
    signUp = async (
        details: profileType
    ): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement sign up logic here
        return { status: requestStatus.SUCCESS }
    }

    signIn = async (details: {
        emailAddress: string
        password: string
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement sign in logic here
        return { status: requestStatus.SUCCESS }
    }

    signOut = async (): Promise<{
        status: requestStatus
        errorCode?: string
    }> => {
        // Implement sign out logic here
        return { status: requestStatus.SUCCESS }
    }

    getAuthUser = async (details: {
        userId: string
    }): Promise<{
        status: requestStatus
        errorCode?: string
        data?: authUserType
    }> => {
        // Implement get user data logic here
        return { status: requestStatus.SUCCESS }
    }

    setProfilePicture = async (details: {
        profilePicture: string
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement set profile picture logic here
        return { status: requestStatus.SUCCESS }
    }

    setBio = async (details: {
        bio: string
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement set bio logic here
        return { status: requestStatus.SUCCESS }
    }

    setRatePerDay = async (details: {
        ratePerDay: string
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement set rate per day logic here
        return { status: requestStatus.SUCCESS }
    }

    setInterests = async (details: {
        interests: categories[]
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement set interests logic here
        return { status: requestStatus.SUCCESS }
    }

    setLinks = async (details: {
        links: string[]
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement set links logic here
        return { status: requestStatus.SUCCESS }
    }

    setPhone = async (details: {
        countryCode: string
        phoneNumber: string
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement set phone logic here
        return { status: requestStatus.SUCCESS }
    }

    setEmail = async (details: {
        emailAddress: string
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement set email logic here
        return { status: requestStatus.SUCCESS }
    }

    setPassword = async (details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement set password logic here
        return { status: requestStatus.SUCCESS }
    }

    createProject = async (details: {
        project: projectType
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement create project logic here
        return { status: requestStatus.SUCCESS }
    }

    createJob = async (details: {
        job: jobType
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement create job logic here
        return { status: requestStatus.SUCCESS }
    }

    actionAgreement = async (details: {
        jobId: string
        action: agreementAction
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
        // Implement accept job logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new AuthUser()
