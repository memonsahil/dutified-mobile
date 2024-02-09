import requestStatus from '../../enums/requestStatus'
import ProjectInterface from '../interfaces/projectInterface'
import projectType from '../types/projectType'
import promiseType from '../types/promiseType'
import firestore from '@react-native-firebase/firestore'

class Project implements ProjectInterface {
    getProjectResults = async (details: {
        searchQuery: string
    }): Promise<promiseType> => {
        try {
            const matchingProjects: projectType[] = []
            const querySnapshot = await firestore().collection('projects').get()

            querySnapshot.forEach((doc) => {
                if (
                    doc
                        .data()
                        .projectName?.toLowerCase()
                        .includes(details.searchQuery.toLowerCase()) ||
                    doc
                        .data()
                        .category?.toLowerCase()
                        .includes(details.searchQuery.toLowerCase())
                ) {
                    matchingProjects.push(doc.data() as projectType)
                }
            })

            if (matchingProjects.length > 0) {
                return {
                    status: requestStatus.SUCCESS,
                    data: matchingProjects,
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
