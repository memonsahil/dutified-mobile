import agreementAction from '../../enums/agreementAction'
import requestStatus from '../../enums/requestStatus'
import PaymentInterface from '../interfaces/paymentInterface'
import paymentType from '../types/paymentType'
import auth from '@react-native-firebase/auth'
import promiseType from '../types/promiseType'
import firestore from '@react-native-firebase/firestore'

class Payment implements PaymentInterface {
    setPaymentDetails = async (details: {
        paymentDetails: paymentType
    }): Promise<promiseType> => {
        try {
            await firestore()
                .collection('users')
                .doc(auth().currentUser?.uid)
                .update({
                    paymentDetails: details.paymentDetails,
                })

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    actionAgreement = async (details: {
        jobId: string
        action: agreementAction
    }): Promise<promiseType> => {
        // Implement accept job logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new Payment()
