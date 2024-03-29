import promiseType from '../types/promiseType'

export default interface UserInterface {
    getUser: (details: { userId: string }) => Promise<promiseType>
    getUserFeedbacks: (details: { userId: string }) => Promise<promiseType>
    getUserNetwork: (details: { userId: string }) => Promise<promiseType>
    getUserResults: (details: { searchQuery: string }) => Promise<promiseType>
}
