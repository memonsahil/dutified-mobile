import authUserState from '../state/authUserState'
import projectState from '../state/projectState'
import jobState from '../state/jobState'

export default interface authUserActions {
    updateAuthUser: (authUser: authUserState) => void
    removeAuthUser: () => void
    updatePhone: (details: { countryCode: string; phoneNumber: string }) => void
    updateEmail: (emailAddress: string) => void
    updateWorkSetup: (details: {
        preferredCategories: string[]
        totalJobs: string
    }) => void
    updateProjects: (details: projectState) => void
    updateJobs: (details: jobState) => void
}
