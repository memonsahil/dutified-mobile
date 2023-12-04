import { create } from 'zustand'
import globalStoreType from '../types/globalStoreType'

const initialState = {
    selectedAttachments: [],
    selectedJob: null,
}

const globalStore = create<globalStoreType>((set) => ({
    ...initialState,
    setSelectedAttachments: (attachments) =>
        set(() => ({ selectedAttachments: attachments })),
    setSelectedJob: (job) => set(() => ({ selectedJob: job })),
}))

export default globalStore
