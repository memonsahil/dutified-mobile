import requestStatus from '../../enums/requestStatus'
import PostInterface from '../interfaces/postInterface'
import commentType from '../types/commentType'
import postType from '../types/postType'
import auth from '@react-native-firebase/auth'
import promiseType from '../types/promiseType'
import firestore from '@react-native-firebase/firestore'

class Post implements PostInterface {
    getUserFeed = async (): Promise<promiseType> => {
        try {
            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    createPost = async (details: { post: postType }): Promise<promiseType> => {
        try {
            await firestore()
                .collection('posts')
                .doc(details.post.postId)
                .set(details.post)
            await firestore()
                .collection('users')
                .doc(auth().currentUser?.uid)
                .update({
                    ['userPosts']: firestore.FieldValue.arrayUnion(
                        details.post
                    ),
                })

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    createComment = async (details: {
        comment: commentType
    }): Promise<promiseType> => {
        try {
            await firestore()
                .collection('posts')
                .doc(details.comment.postId)
                .update({
                    ['comments']: firestore.FieldValue.arrayUnion(
                        details.comment
                    ),
                })

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    getComments = async (details: { postId: string }): Promise<promiseType> => {
        try {
            const doc = await firestore()
                .collection('posts')
                .doc(details.postId)
                .get()

            if (doc.exists) {
                return {
                    status: requestStatus.SUCCESS,
                    data: doc.data()?.comments as commentType[],
                }
            } else {
                return { status: requestStatus.ERROR }
            }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }
}

export default new Post()
