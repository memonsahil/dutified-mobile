import requestStatus from '../../enums/requestStatus'
import jobState from '../state/jobState'

export default interface JobInterface {
    getJobResults: (searchQuery: string) => Promise<{
        status: requestStatus
        data?: jobState[]
    }>
    getProjectJobs: (projectId: string) => Promise<{
        status: requestStatus
        data?: jobState[]
    }>
    getJob: (jobId: string) => Promise<{
        status: requestStatus
        data?: jobState
    }>
    findPreferredJobs: (details: {
        preferredCategories: string[]
        totalJobs: string
    }) => Promise<{
        status: requestStatus
        data?: jobState[]
    }>
}
