import categories from '../../enums/categories'
import jobStatus from '../../enums/jobStatus'

type jobType = {
    jobId: string
    jobName: string
    jobCreatorId: string
    jobCreator: string
    jobWorkerId: string
    jobWorker: string
    categories: categories[]
    description: string
    dueDate: string
    payment: string
    status: jobStatus
}

export default jobType
