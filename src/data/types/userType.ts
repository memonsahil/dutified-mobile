import jobType from './jobType'
import ratings from '../../enums/ratings'
import categories from '../../enums/categories'

type userType = {
    profile: {
        profilePicture: string
        description: string
        interests: categories[]
        affiliation: {}
    }
    jobsCreated: jobType[]
    jobsWorked: jobType[]
    feedbacks: {
        userId: string
        userName: string
        feedbackId: string
        feedback: string
        rating: ratings
    }[]
}

export default userType
