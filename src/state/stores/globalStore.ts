import { create } from 'zustand'
import globalStoreType from '../types/globalStoreType'

const initialState = {
    selectedAttachments: [],
    showAgreementModal: false,
    showJobModal: false,
    selectedJob: null,
}

const globalStore = create<globalStoreType>()((set) => ({
    ...initialState,
    setSelectedAttachments: (attachments) =>
        set(() => ({ selectedAttachments: attachments })),
    setShowAgreementModal: (show) => set(() => ({ showAgreementModal: show })),
    setShowJobModal: (show) => set(() => ({ showJobModal: show })),
    setSelectedJob: (job) => set(() => ({ selectedJob: job })),
}))

export default globalStore
