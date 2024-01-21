import promiseType from '../types/promiseType'

export default interface ProjectInterface {
    getProjectResults: (details: {
        searchQuery: string
    }) => Promise<promiseType>
    getProject: (details: { projectId: string }) => Promise<promiseType>
}
