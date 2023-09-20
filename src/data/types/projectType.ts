import categories from '../../enums/categories'

type projectType = {
    projectId: string
    projectName: string
    projectCreatorId: string
    projectCreator: string
    category: categories
    description: string
    creationDate: string
}

export default projectType
