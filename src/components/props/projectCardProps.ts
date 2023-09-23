import categories from '../../enums/categories'

type projectCardProps = {
    projectId: string
    projectName: string
    description: string
    creationDate: string
    category: categories
    showPlus: boolean
}

export default projectCardProps
