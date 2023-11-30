import attachmentType from '../../data/types/attachmentType'

type globalStoreType = {
    selectedAttachments: attachmentType[]
    setSelectedAttachments: (attachments: attachmentType[]) => void
}

export default globalStoreType
