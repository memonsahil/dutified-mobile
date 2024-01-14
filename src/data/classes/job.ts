import requestStatus from '../../enums/requestStatus'
import JobInterface from '../interfaces/jobInterace'
import jobType from '../types/jobType'

class Job implements JobInterface {
    getJobResults = async (details: {
        searchQuery: string
    }): Promise<{
        status: requestStatus
        errorCode?: string
        data?: jobType[]
    }> => {
        // Implement get job results logic here
        return { status: requestStatus.SUCCESS }
    }

    getJob = async (details: {
        jobId: string
    }): Promise<{
        status: requestStatus
        errorCode?: string
        data?: jobType
    }> => {
        // Implement get job logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new Job()
