import jobType from './jobType'

type projectType = {
    projectId: string
    projectName: string
    projectCreatorId: string
    projectCreator: string
    category: string
    description: string
    creationDate: string
    jobs: Array<jobType>
}

export default projectType
