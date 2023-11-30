import { create } from 'zustand'
import authUserType from '../../data/types/authUserType'
import authUserStoreType from '../types/authUserStoreType'

const initialState: authUserType = {
    account: {
        identity: {
            userId: '',
            firstName: '',
            lastName: '',
            countryCode: '',
            phoneNumber: '',
            emailAddress: '',
        },
        affiliation: {
            orgName: '',
            orgDesc: '',
            website: '',
            userTitle: '',
        },
        paymentDetails: {
            cardHolderName: '',
            cardNumber: '',
            expiryDate: '',
            cvc: '',
        },
        metaData: {
            creationDate: '',
            lastLoginDate: '',
            lastTransactionDate: '',
        },
    },
    profile: {
        firstName: '',
        lastName: '',
        profilePicture: '',
        bio: '',
        interests: [],
    },
    projectsCreated: [],
    projectsWorked: [],
    jobsCreated: [],
    jobsWorked: [],
    feedbacks: [],
    payments: [],
    chats: [],
}

const authUserStore = create<authUserStoreType>()((set) => ({
    ...initialState,
    updateAuthUser: (authUser: authUserType) => set(() => authUser),
    removeAuthUser: () => set(() => initialState),
}))

export default authUserStore
