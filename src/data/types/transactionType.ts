import transactions from '../../enums/transactions'

type transactionType = {
    paymentId: string
    amount: string
    payerId: string
    payerName: string
    payerAvatar: string
    payeeId: string
    payeeName: string
    payeeAvatar: string
    transactionType: transactions
    id: string
    name: string
    creationDate: string
}

export default transactionType
