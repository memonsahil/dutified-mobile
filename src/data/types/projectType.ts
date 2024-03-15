import jobType from './jobType'
import transactionType from './transactionType'
import userType from './userType'

type projectType = {
    projectId: string
    projectName: string
    creatorId: string
    creatorName: string
    creatorAvatar: string
    category: string
    images: string[]
    description: string
    team: userType[]
    jobs: jobType[]
    funding: transactionType[]
    creationDate: string
}

export default projectType
