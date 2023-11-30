import requestStatus from '../../enums/requestStatus'
import JobInterface from '../interfaces/jobInterace'
import jobType from '../types/jobType'

class Job implements JobInterface {
    getJobResults = async (
        searchQuery: string
    ): Promise<{
        status: requestStatus
        data?: jobType[]
    }> => {
        // Implement get job results logic here
        return { status: requestStatus.SUCCESS }
    }

    getJob = async (
        jobId: string
    ): Promise<{
        status: requestStatus
        data?: jobType
    }> => {
        // Implement get job logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new Job()
