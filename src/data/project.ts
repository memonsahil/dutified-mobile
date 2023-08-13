import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import requestStatus from '../enums/requestStatus'
import ProjectInterface from '../interfaces/actions/projectInterface'
import projectState from '../interfaces/state/projectState'

class Project implements ProjectInterface {
    async getProjectResults(searchQuery: string) {
        let nameResults: projectState[] = []
        let categoryResults: projectState[] = []
        let searchResults: projectState[] = []
        let projectData: projectState
        let projectName: string = ''
        let category: string = ''

        return await firestore()
            .collection('allProjects')
            .where('projectCreatorId', '!=', auth().currentUser?.uid as string)
            .get()
            .then((querySnapshot) => {
                querySnapshot.docs.forEach((doc) => {
                    projectData = doc.data() as projectState
                    projectName = projectData.projectName.toLowerCase()
                    category = projectData.category.toLowerCase()

                    if (projectName.includes(searchQuery.toLowerCase())) {
                        nameResults.push(projectData)
                    } else if (category.includes(searchQuery.toLowerCase())) {
                        categoryResults.push(projectData)
                    }
                })

                searchResults = Array.from(
                    new Set([...nameResults, ...categoryResults])
                )

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                    data: searchResults,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    async getProject(projectId: string) {
        let project: projectState

        return await firestore()
            .collection('allProjects')
            .where('projectId', '==', projectId)
            .limit(1)
            .get()
            .then((querySnapshot) => {
                project = querySnapshot.docs[0].data() as projectState

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                    data: project,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }
}

export default new Project()
