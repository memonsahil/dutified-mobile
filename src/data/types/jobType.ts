import jobStatus from '../../enums/jobStatus'

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
    payment: string
    images: string[]
    description: string
    creationDate: string
}

export default jobType
