import { create } from 'zustand'
import globalStoreType from '../types/globalStoreType'
import jobStatus from '../../enums/jobStatus'
import categories from '../../enums/categories'

const globalStore = create<globalStoreType>((set) => ({
    selectedAttachments: [],
    selectedJob: {
        jobId: '',
        jobName: '',
        projectId: '',
        projectName: '',
        jobCreatorId: '',
        jobCreator: '',
        jobWorkerId: '',
        jobWorker: '',
        status: jobStatus.AVAILABLE,
        category: categories.OTHER,
        payment: '',
        description: '',
        creationDate: '',
        dueDate: '',
    },
    setSelectedAttachments: (attachments) =>
        set(() => ({ selectedAttachments: attachments })),
    setSelectedJob: (job) => set(() => ({ selectedJob: job })),
}))

export default globalStore
