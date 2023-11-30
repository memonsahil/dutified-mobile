import { create } from 'zustand'
import globalStoreType from '../types/globalStoreType'

const globalStore = create<globalStoreType>((set) => ({
    selectedAttachments: [],
    setSelectedAttachments: (attachments) =>
        set(() => ({ selectedAttachments: attachments })),
}))

export default globalStore
