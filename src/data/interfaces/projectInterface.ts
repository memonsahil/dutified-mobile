import requestStatus from '../../enums/requestStatus'
import projectType from '../types/projectType'

export default interface ProjectInterface {
    getProjectResults: (details: { searchQuery: string }) => Promise<{
        status: requestStatus
        errorCode?: string
        data?: projectType[]
    }>
    getProject: (details: { projectId: string }) => Promise<{
        status: requestStatus
        errorCode?: string
        data?: projectType
    }>
}
