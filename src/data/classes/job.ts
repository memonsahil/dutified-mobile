import requestStatus from '../../enums/requestStatus'
import JobInterface from '../interfaces/jobInterace'
import jobType from '../types/jobType'
import promiseType from '../types/promiseType'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

class Job implements JobInterface {
    getJobResults = async (details: {
        searchQuery: string
    }): Promise<promiseType> => {
        try {
            const matchingJobs: jobType[] = []
            const querySnapshot = await firestore().collection('jobs').get()

            querySnapshot.forEach((doc) => {
                if (
                    (doc
                        .data()
                        .jobName?.toLowerCase()
                        .includes(details.searchQuery.toLowerCase()) ||
                        doc
                            .data()
                            .category?.toLowerCase()
                            .includes(details.searchQuery.toLowerCase())) &&
                    doc.data().jobCreatorId !== auth().currentUser?.uid
                ) {
                    matchingJobs.push(doc.data() as jobType)
                }
            })

            if (matchingJobs.length > 0) {
                return {
                    status: requestStatus.SUCCESS,
                    data: matchingJobs,
                }
            } else {
                return { status: requestStatus.ERROR }
            }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

    getJob = async (details: { jobId: string }): Promise<promiseType> => {
        // Implement get job logic here
        return { status: requestStatus.SUCCESS }
    }
}

export default new Job()
