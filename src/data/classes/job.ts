import requestStatus from '../../enums/requestStatus'
import JobInterface from '../interfaces/jobInterace'
import promiseType from '../types/promiseType'

class Job implements JobInterface {
    getJobResults = async (details: {
        searchQuery: string
    }): Promise<promiseType> => {
        // Implement get job results logic here
        return { status: requestStatus.SUCCESS }
    }

    getJob = async (details: { jobId: string }): Promise<promiseType> => {
        // Implement get job logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new Job()
