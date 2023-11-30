import AuthUserInterface from '../interfaces/authUserInterface'
import jobType from '../types/jobType'
import requestStatus from '../../enums/requestStatus'
import authUserType from '../types/authUserType'
import projectType from '../types/projectType'

class AuthUser implements AuthUserInterface {
    signUp = async (details: {
        firstName: string
        lastName: string
        countryCode: string
        phoneNumber: string
        emailAddress: string
        password: string
    }): Promise<{ status: requestStatus; errorCode?: string }> => {
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

    getAuthUser = async (): Promise<{
        status: requestStatus
        data?: authUserType
    }> => {
        // Implement get auth user logic here
        return { status: requestStatus.SUCCESS }
    }

    signOut = async (): Promise<{ status: requestStatus }> => {
        // Implement sign out logic here
        return { status: requestStatus.SUCCESS }
    }

    setProfilePicture = async (
        profilePicture: string
    ): Promise<{ status: requestStatus }> => {
        // Implement set profile picture logic here
        return { status: requestStatus.SUCCESS }
    }

    setPhone = async (details: {
        countryCode: string
        phoneNumber: string
    }): Promise<{ status: requestStatus }> => {
        // Implement set phone logic here
        return { status: requestStatus.SUCCESS }
    }

    setEmail = async (
        emailAddress: string
    ): Promise<{ status: requestStatus }> => {
        // Implement set email logic here
        return { status: requestStatus.SUCCESS }
    }

    setPassword = async (details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }): Promise<{ status: requestStatus }> => {
        // Implement set password logic here
        return { status: requestStatus.SUCCESS }
    }

    createProject = async (
        details: projectType
    ): Promise<{ status: requestStatus }> => {
        // Implement create project logic here
        return { status: requestStatus.SUCCESS }
    }

    createJob = async (
        details: jobType
    ): Promise<{ status: requestStatus }> => {
        // Implement create job logic here
        return { status: requestStatus.SUCCESS }
    }

    acceptJob = async (
        details: jobType
    ): Promise<{ status: requestStatus }> => {
        // Implement accept job logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new AuthUser()
