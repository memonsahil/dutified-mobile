import requestStatus from '../../enums/requestStatus'
import projectState from '../state/projectState'

export default interface projectActions {
    getProjectResults: (searchQuery: string) => Promise<{
        status: requestStatus
        errorCode?: string
        data?: projectState[]
    }>
    getProject: (projectId: string) => Promise<{
        status: requestStatus
        errorCode?: string
        data?: projectState
    }>
}
