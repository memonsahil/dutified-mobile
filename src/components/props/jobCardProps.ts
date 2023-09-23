import categories from '../../enums/categories'

type jobCardProps = {
    jobId: string
    jobName: string
    status: string
    payment: string
    description: string
    creationDate: string
    category: categories
    showPlus: boolean
}

export default jobCardProps
