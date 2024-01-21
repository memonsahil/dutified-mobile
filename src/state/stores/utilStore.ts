import { create } from 'zustand'
import utilStoreType from '../types/utilStoreType'

const initialState = {
    selectedAttachments: [],
    showAgreementModal: false,
    showJobModal: false,
    selectedJob: null,
}

const utilStore = create<utilStoreType>()((set) => ({
    ...initialState,
    setSelectedAttachments: (attachments) =>
        set(() => ({ selectedAttachments: attachments })),
    setShowAgreementModal: (show) => set(() => ({ showAgreementModal: show })),
    setShowJobModal: (show) => set(() => ({ showJobModal: show })),
    setSelectedJob: (job) => set(() => ({ selectedJob: job })),
}))

export default utilStore
