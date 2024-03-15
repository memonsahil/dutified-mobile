import feedbackType from './feedbackType'
import jobType from './jobType'
import postType from './postType'
import profileType from './profileType'
import projectType from './projectType'

type userType = {
    userId: string
    profileDetails: profileType
    network: userType[]
    projectsCreated: projectType[]
    projectsWorked: projectType[]
    jobsCreated: jobType[]
    jobsWorked: jobType[]
    postsCreated: postType[]
    feedbacks: feedbackType[]
    creationDate: string
}

export default userType
