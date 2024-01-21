import { create } from 'zustand'
import authStoreType from '../types/authStoreType'

const authStore = create<authStoreType>()((set) => ({
    currentUser: null,
    setCurrentUser: (currentUser) => set(() => ({ currentUser: currentUser })),
}))

export default authStore
