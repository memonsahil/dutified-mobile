import requestStatus from '../../enums/requestStatus'

type promiseType = {
    status: requestStatus
    errorCode?: string
    data?: any
}

export default promiseType
