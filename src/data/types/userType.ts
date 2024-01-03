import projectType from './projectType'
import jobType from './jobType'
import feedbackType from './feedbackType'
import profileType from './profileType'

type userType = {
    profile: profileType
    projectsCreated: projectType[]
    jobsCreated: jobType[]
    projectsWorked: projectType[]
    jobsWorked: jobType[]
    feedbacks: feedbackType[]
}

export default userType
