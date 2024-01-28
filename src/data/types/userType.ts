import projectType from './projectType'
import jobType from './jobType'
import feedbackType from './feedbackType'
import profileType from './profileType'
import postType from './postType'

type userType = {
    profile: profileType
    posts: postType[]
    projectsCreated: projectType[]
    jobsCreated: jobType[]
    projectsWorked: projectType[]
    jobsWorked: jobType[]
    feedbacks: feedbackType[]
}

export default userType
