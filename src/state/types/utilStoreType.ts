import jobCardProps from '../../components/props/jobCardProps'
import attachmentType from '../../data/types/attachmentType'

type utilStoreType = {
    signedIn: boolean
    selectedAttachments: attachmentType[]
    showAgreementModal: boolean
    showJobModal: boolean
    selectedJob: jobCardProps | null
    setSignedIn: (signedIn: boolean) => void
    setSelectedAttachments: (attachments: attachmentType[]) => void
    setShowAgreementModal: (show: boolean) => void
    setShowJobModal: (show: boolean) => void
    setSelectedJob: (job: jobCardProps | null) => void
}

export default utilStoreType
