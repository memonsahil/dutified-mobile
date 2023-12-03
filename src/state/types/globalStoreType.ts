import attachmentType from '../../data/types/attachmentType'
import jobType from '../../data/types/jobType'

type globalStoreType = {
    selectedAttachments: attachmentType[]
    selectedJob: jobType
    setSelectedAttachments: (attachments: attachmentType[]) => void
    setSelectedJob: (job: jobType) => void
}

export default globalStoreType
