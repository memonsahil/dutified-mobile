import categories from '../../enums/categories'

type jobCardProps = {
    jobId: string
    jobName: string
    status: string
    payment: string
    description: string
    dueDate: string
    category: categories
}

export default jobCardProps
