import requestStatus from '../../enums/requestStatus'
import ProjectInterface from '../interfaces/projectInterface'
import projectType from '../types/projectType'
import promiseType from '../types/promiseType'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

class Project implements ProjectInterface {
    getProjectResults = async (details: {
        searchQuery: string
    }): Promise<promiseType> => {
        try {
            const matchingProjects: projectType[] = []
            const querySnapshot = await firestore().collection('projects').get()

            querySnapshot.forEach((doc) => {
                if (
                    (doc
                        .data()
                        .projectName?.toLowerCase()
                        .includes(details.searchQuery.toLowerCase()) ||
                        doc
                            .data()
                            .category?.toLowerCase()
                            .includes(details.searchQuery.toLowerCase())) &&
                    doc.data().projectCreatorId !== auth().currentUser?.uid
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
        try {
            const doc = await firestore()
                .collection('projects')
                .doc(details.projectId)
                .get()

            if (doc.exists) {
                return {
                    status: requestStatus.SUCCESS,
                    data: doc.data() as projectType,
                }
            } else {
                return { status: requestStatus.ERROR }
            }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }
}

export default new Project()
