import JobInterface from '../interfaces/jobInterace'

class Job implements JobInterface {
    getJobResults(searchQuery: string) {}

    getJob(jobId: string) {}
}

export default new Job()
