import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import requestStatus from '../enums/requestStatus'
import JobInterface from '../interfaces/actions/jobInterace'
import jobState from '../interfaces/state/jobState'

class Job implements JobInterface {
    async getJobResults(searchQuery: string) {
        let nameResults: jobState[] = []
        let categoryResults: jobState[] = []
        let searchResults: jobState[] = []
        let jobData: jobState
        let jobName: string = ''
        let category: string = ''

        return await firestore()
            .collection('allJobs')
            .where('jobCreatorId', '!=', auth().currentUser?.uid as string)
            .get()
            .then((querySnapshot) => {
                querySnapshot.docs.forEach((doc) => {
                    jobData = doc.data() as jobState
                    jobName = jobData.projectName.toLowerCase()
                    category = jobData.category.toLowerCase()

                    if (jobName.includes(searchQuery.toLowerCase())) {
                        nameResults.push(jobData)
                    } else if (category.includes(searchQuery.toLowerCase())) {
                        categoryResults.push(jobData)
                    }
                })

                searchResults = Array.from(
                    new Set([...nameResults, ...categoryResults])
                )

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                    data: searchResults,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    async getProjectJobs(projectId: string) {
        let jobs: jobState[] = []

        return await firestore()
            .collection('allJobs')
            .where('projectId', '==', projectId)
            .get()
            .then((querySnapshot) => {
                jobs = querySnapshot.docs.map((doc) => doc.data() as jobState)

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                    data: jobs,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    async getJob(jobId: string) {
        let job: jobState

        return await firestore()
            .collection('allJobs')
            .where('jobId', '==', jobId)
            .limit(1)
            .get()
            .then((querySnapshot) => {
                job = querySnapshot.docs.map((doc) => doc.data() as jobState)[0]

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                    data: job,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    async findPreferredJobs(details: {
        preferredCategories: string[]
        totalJobs: string
    }) {
        let allJobs: jobState[] = []
        let preferredJobs: jobState[] = []

        return await firestore()
            .collection('allJobs')
            .where('jobCreatorId', '!=', auth().currentUser?.uid as string)
            .limit(parseInt(details.totalJobs))
            .get()
            .then((querySnapshot) => {
                allJobs = querySnapshot.docs.map(
                    (doc) => doc.data() as jobState
                )

                allJobs.map((job: jobState) => {
                    if (details.preferredCategories.includes(job.category)) {
                        preferredJobs.push(job)
                    }
                })

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                    data: preferredJobs,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }
}
