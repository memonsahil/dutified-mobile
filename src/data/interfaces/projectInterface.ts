import projectType from '../types/projectType'
import promiseType from '../types/promiseType'

export default interface ProjectInterface {
    createProject: (details: { project: projectType }) => Promise<promiseType>
    getProject: (details: { projectId: string }) => Promise<promiseType>
    getProjectResults: (details: {
        searchQuery: string
    }) => Promise<promiseType>
}
