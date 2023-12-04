import jobCardProps from '../../components/props/jobCardProps'
import attachmentType from '../../data/types/attachmentType'

type globalStoreType = {
    selectedAttachments: attachmentType[]
    selectedJob: jobCardProps | null
    setSelectedAttachments: (attachments: attachmentType[]) => void
    setSelectedJob: (job: jobCardProps | null) => void
}

export default globalStoreType
