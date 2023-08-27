import requestStatus from '../../enums/requestStatus'
import jobType from '../types/jobType'

export default interface JobInterface {
    getJobResults: (searchQuery: string) => Promise<{
        status: requestStatus
        data?: jobType[]
    }>
    getJob: (jobId: string) => Promise<{
        status: requestStatus
        data?: jobType
    }>
}
