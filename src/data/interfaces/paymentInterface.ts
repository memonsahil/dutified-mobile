import agreementAction from '../../enums/agreementAction'
import paymentType from '../types/paymentType'
import promiseType from '../types/promiseType'

export default interface PaymentInterface {
    setPaymentDetails: (details: {
        paymentDetails: paymentType
    }) => Promise<promiseType>
    actionAgreement: (details: {
        jobId: string
        action: agreementAction
    }) => Promise<promiseType>
}
