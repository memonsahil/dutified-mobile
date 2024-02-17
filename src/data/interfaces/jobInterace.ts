import jobType from '../types/jobType'
import promiseType from '../types/promiseType'

export default interface JobInterface {
    createJob: (details: { job: jobType }) => Promise<promiseType>
    getJob: (details: { jobId: string }) => Promise<promiseType>
    getJobResults: (details: { searchQuery: string }) => Promise<promiseType>
}
