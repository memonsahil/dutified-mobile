import { create } from 'zustand'
import authUserType from '../../data/types/authUserType'
import authUserStoreType from '../types/authUserStoreType'

const initialState: authUserType = {
    account: {
        userId: '',
        firstName: '',
        lastName: '',
        countryCode: '',
        phoneNumber: '',
        emailAddress: '',
    },
    profile: {
        userName: '',
        profilePicture: '',
        description: '',
        interests: [],
        affiliation: {},
    },
    jobsCreated: [],
    jobsWorked: [],
    feedbacks: [],
    chats: [],
    payments: [],
}

const authUserStore = create<authUserStoreType>()((set) => ({
    ...initialState,
    updateAuthUser: async (authUser: authUserType) => {
        set((state: authUserType) => ({
            ...state,
            account: {
                ...state.account,
                userId: authUser.account.userId,
                firstName: authUser.account.firstName,
                lastName: authUser.account.lastName,
                countryCode: authUser.account.countryCode,
                phoneNumber: authUser.account.phoneNumber,
                emailAddress: authUser.account.emailAddress,
            },
            profile: {
                ...state.profile,
                userName: authUser.profile.userName,
                profilePicture: authUser.profile.profilePicture,
                description: authUser.profile.description,
                interests: authUser.profile.interests,
                affiliation: authUser.profile.affiliation,
            },
            jobsCreated: authUser.jobsCreated,
            jobsWorked: authUser.jobsWorked,
            feedbacks: authUser.feedbacks,
            chats: authUser.chats,
            payments: authUser.payments,
        }))
    },
    removeAuthUser: async () => {
        set(initialState)
    },
}))

export default authUserStore
