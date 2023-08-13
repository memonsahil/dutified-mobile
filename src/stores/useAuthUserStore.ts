import { create } from 'zustand'
import authUserActions from '../interfaces/actions/authUserActions'
import authUserState from '../interfaces/state/authUserState'
import projectState from '../interfaces/state/projectState'
import jobState from '../interfaces/state/jobState'

const initialState: authUserState = {
    userDetails: {
        userId: '',
        firstName: '',
        lastName: '',
        imageSrc: '',
        countryCode: '',
        phoneNumber: '',
        emailAddress: '',
    },
    projects: [],
    jobs: [],
    feedbacks: [],
    workSetup: {
        preferredCategories: [],
        totalJobs: '',
    },
}

const useAuthUserStore = create<authUserActions & authUserState>()((set) => ({
    ...initialState,
    updateAuthUser: async (authUser: authUserState) => {
        set((state) => ({
            ...state,
            userDetails: {
                ...state.userDetails,
                userId: authUser.userDetails.userId,
                firstName: authUser.userDetails.firstName,
                lastName: authUser.userDetails.lastName,
                imageSrc: authUser.userDetails.imageSrc,
                countryCode: authUser.userDetails.countryCode,
                phoneNumber: authUser.userDetails.phoneNumber,
                emailAddress: authUser.userDetails.emailAddress,
            },
            projects: authUser.projects,
            jobs: authUser.jobs,
            feedbacks: authUser.feedbacks,
            workSetup: {
                ...state.workSetup,
                preferredCategories: authUser.workSetup.preferredCategories,
                totalJobs: authUser.workSetup.totalJobs,
            },
        }))
    },
    removeAuthUser: async () => {
        set(initialState)
    },
    updateImage: async (imageSrc: string) => {
        set((state) => ({
            ...state,
            userDetails: {
                ...state.userDetails,
                imageSrc: imageSrc,
            },
        }))
    },
    updatePhone: async (details: {
        countryCode: string
        phoneNumber: string
    }) => {
        set((state) => ({
            ...state,
            userDetails: {
                ...state.userDetails,
                countryCode: details.countryCode,
                phoneNumber: details.phoneNumber,
            },
        }))
    },
    updateEmail: async (emailAddress: string) => {
        set((state) => ({
            ...state,
            userDetails: {
                ...state.userDetails,
                emailAddress: emailAddress,
            },
        }))
    },
    updateWorkSetup: async (details: {
        preferredCategories: string[]
        totalJobs: string
    }) => {
        set((state) => ({
            ...state,
            workSetup: {
                ...state.workSetup,
                preferredCategories: details.preferredCategories,
                totalJobs: details.totalJobs,
            },
        }))
    },
    updateProjects: async (details: projectState) => {
        set((state) => ({
            ...state,
            projects: [
                ...state.projects,
                {
                    projectId: details.projectId,
                    projectName: details.projectName,
                    projectCreatorId: details.projectCreatorId,
                    projectCreator: details.projectCreator,
                    category: details.category,
                    projectDesc: details.projectDesc,
                },
            ],
        }))
    },
    updateJobs: async (details: jobState) => {
        set((state) => ({
            ...state,
            jobs: [
                ...state.jobs,
                {
                    jobId: details.jobId,
                    jobName: details.jobName,
                    projectId: details.projectId,
                    projectName: details.projectName,
                    jobCreatorId: details.jobCreatorId,
                    jobCreator: details.jobCreator,
                    jobWorkerId: details.jobWorkerId,
                    jobWorker: details.jobWorker,
                    category: details.category,
                    payment: details.payment,
                    status: details.status,
                    deadline: details.deadline,
                    jobDesc: details.jobDesc,
                },
            ],
        }))
    },
}))

export default useAuthUserStore
