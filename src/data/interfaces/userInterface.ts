import promiseType from '../types/promiseType'

export default interface UserInterface {
    getUserResults: (details: { searchQuery: string }) => Promise<promiseType>
    getUser: (details: { userId: string }) => Promise<promiseType>
}
