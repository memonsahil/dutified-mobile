import promiseType from '../types/promiseType'

export default interface JobInterface {
    getJobResults: (details: { searchQuery: string }) => Promise<promiseType>
    getJob: (details: { jobId: string }) => Promise<promiseType>
}
