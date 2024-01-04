import requestStatus from '../../enums/requestStatus'
import jobType from '../types/jobType'

export default interface JobInterface {
    getJobResults: (details: { searchQuery: string }) => Promise<{
        status: requestStatus
        errorCode: string
        data?: jobType[]
    }>
    getJob: (details: { jobId: string }) => Promise<{
        status: requestStatus
        errorCode: string
        data?: jobType
    }>
}
