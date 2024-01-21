import promiseType from '../types/promiseType'

export default interface UserInterface {
    getUser: (details: { userId: string }) => Promise<promiseType>
}
