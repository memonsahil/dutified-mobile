type transactionType = {
    paymentId: string
    paymentAmount: string
    payerId: string
    payerName: string
    payerImage: string
    payeeId: string
    payeeName: string
    payeeImage: string
    jobId: string
    jobName: string
    projectId?: string
    projectName?: string
    paymentDate: string
}

export default transactionType
