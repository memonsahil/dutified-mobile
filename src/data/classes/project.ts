import requestStatus from '../../enums/requestStatus'
import ProjectInterface from '../interfaces/projectInterface'
import promiseType from '../types/promiseType'
import firestore from '@react-native-firebase/firestore'

class Project implements ProjectInterface {
    getProjectResults = async (details: {
        searchQuery: string
    }): Promise<promiseType> => {
        try {
            const response = await firestore()
                .collection('projects')
                .where(details.searchQuery, '==', 'projectName')
                .get()

            console.log('response in getProjectResults:', response)

            if (response) {
                return {
                    status: requestStatus.SUCCESS,
                    data: response,
                }
            } else {
                return { status: requestStatus.ERROR }
            }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    getProject = async (details: {
        projectId: string
    }): Promise<promiseType> => {
        // Implement get project logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new Project()
