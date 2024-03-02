import jobType from './jobType'
import userType from './userType'

type projectType = {
    projectId: string
    projectName: string
    creatorId: string
    creatorName: string
    creatorAvatar: string
    category: string
    images: string[]
    projectDesc: string
    team: userType[]
    jobs: jobType[]
    creationDate: string
}

export default projectType
