import jobType from './jobType'
import categories from '../../enums/categories'
import projectType from './projectType'
import feedBackType from './feedbackType'

type userType = {
    profile: {
        firstName: string
        lastName: string
        profilePicture: string
        bio: string
        interests: categories[]
    }
    projectsCreated: projectType[]
    projectsWorked: projectType[]
    jobsCreated: jobType[]
    jobsWorked: jobType[]
    feedbacks: feedBackType[]
}

export default userType
