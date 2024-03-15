import jobStatus from '../../enums/jobStatus'
import transactionType from './transactionType'

type jobType = {
    jobId: string
    jobName: string
    projectId: string
    projectName: string
    creatorId: string
    creatorName: string
    creatorAvatar: string
    workerId: string
    workerName: string
    workerAvatar: string
    status: jobStatus
    category: string
    images: string[]
    description: string
    payment: transactionType
    creationDate: string
}

export default jobType
