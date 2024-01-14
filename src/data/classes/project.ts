import requestStatus from '../../enums/requestStatus'
import ProjectInterface from '../interfaces/projectInterface'
import projectType from '../types/projectType'

class Project implements ProjectInterface {
    getProjectResults = async (details: {
        searchQuery: string
    }): Promise<{
        status: requestStatus
        errorCode?: string
        data?: projectType[]
    }> => {
        // Implement get project results logic here
        return { status: requestStatus.SUCCESS }
    }

    getProject = async (details: {
        projectId: string
    }): Promise<{
        status: requestStatus
        errorCode?: string
        data?: projectType
    }> => {
        // Implement get project logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new Project()
