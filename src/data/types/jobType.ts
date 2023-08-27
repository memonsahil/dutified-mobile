import categories from '../../enums/categories'

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
    status: string
}

export default jobType
