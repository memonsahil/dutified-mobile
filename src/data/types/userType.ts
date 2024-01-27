import projectType from './projectType'
import jobType from './jobType'
import feedbackType from './feedbackType'
import profileType from './profileType'
import categories from '../../enums/categories'
import linkType from './linkType'

type userType = {
    profile: profileType
    interests: categories[]
    links: linkType[]
    dailyRate: string
    projectsCreated: projectType[]
    jobsCreated: jobType[]
    projectsWorked: projectType[]
    jobsWorked: jobType[]
    feedbacks: feedbackType[]
}

export default userType
