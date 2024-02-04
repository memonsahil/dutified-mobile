import jobStatus from '../../enums/jobStatus'

type jobType = {
    jobId: string
    jobName: string
    projectId: string
    projectName: string
    jobCreatorId: string
    jobCreator: string
    jobWorkerId: string
    jobWorker: string
    status: jobStatus
    category: string
    payment: string
    description: string
    creationDate: string
}

export default jobType
