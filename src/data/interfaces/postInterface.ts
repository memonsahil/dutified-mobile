import commentType from '../types/commentType'
import postType from '../types/postType'
import promiseType from '../types/promiseType'

export default interface PostInterface {
    getUserFeed: () => Promise<promiseType>
    createPost: (details: { post: postType }) => Promise<promiseType>
    createComment: (details: { comment: commentType }) => Promise<promiseType>
}
