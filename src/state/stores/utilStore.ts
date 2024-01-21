import { create } from 'zustand'
import utilStoreType from '../types/utilStoreType'

const initialState = {
    signedIn: false,
    selectedAttachments: [],
    showAgreementModal: false,
    showJobModal: false,
    selectedJob: null,
}

const utilStore = create<utilStoreType>()((set) => ({
    ...initialState,
    setSignedIn: (signedIn) => set(() => ({ signedIn: signedIn })),
    setSelectedAttachments: (attachments) =>
        set(() => ({ selectedAttachments: attachments })),
    setShowAgreementModal: (show) => set(() => ({ showAgreementModal: show })),
    setShowJobModal: (show) => set(() => ({ showJobModal: show })),
    setSelectedJob: (job) => set(() => ({ selectedJob: job })),
}))

export default utilStore
