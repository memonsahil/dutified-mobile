import selection from '../../enums/selections'

type jobCardProps = {
    jobId: string
    jobName: string
    status: string
    payment: string
    description: string
    creationDate: string
    category: string
    showPlus: selection
    additionalStyle?: object
}

export default jobCardProps
