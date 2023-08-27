import categories from '../../enums/categories'

export default interface jobState {
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
