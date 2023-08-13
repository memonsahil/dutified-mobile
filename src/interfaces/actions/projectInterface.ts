import requestStatus from '../../enums/requestStatus'
import projectState from '../state/projectState'

export default interface ProjectInterface {
    getProjectResults: (searchQuery: string) => Promise<{
        status: requestStatus
        data?: projectState[]
    }>
    getProject: (projectId: string) => Promise<{
        status: requestStatus
        data?: projectState
    }>
}
