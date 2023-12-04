import categories from '../../enums/categories'
import selection from '../../enums/selection'

type jobCardProps = {
    jobId: string
    jobName: string
    status: string
    payment: string
    description: string
    creationDate: string
    category: categories
    showPlus: selection
    additionalStyle?: object
}

export default jobCardProps
