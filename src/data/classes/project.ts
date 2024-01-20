import requestStatus from '../../enums/requestStatus'
import ProjectInterface from '../interfaces/projectInterface'
import promiseType from '../types/promiseType'

class Project implements ProjectInterface {
    getProjectResults = async (details: {
        searchQuery: string
    }): Promise<promiseType> => {
        // Implement get project results logic here
        return { status: requestStatus.SUCCESS }
    }

    getProject = async (details: {
        projectId: string
    }): Promise<promiseType> => {
        // Implement get project logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new Project()
