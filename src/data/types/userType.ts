import feedbackType from './feedbackType'
import jobType from './jobType'
import postType from './postType'
import projectType from './projectType'

type userType = {
    userId?: string
    userName: string
    userAvatar: string
    userDesc: string
    categories: string[]
    links: string[]
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
