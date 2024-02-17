import requestStatus from '../../enums/requestStatus'
import JobInterface from '../interfaces/jobInterace'
import jobType from '../types/jobType'
import promiseType from '../types/promiseType'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

class Job implements JobInterface {
    createJob = async (details: { job: jobType }): Promise<promiseType> => {
        try {
            await firestore()
                .collection('jobs')
                .doc(details.job.jobId)
                .set(details.job)
            await firestore()
                .collection('users')
                .doc(auth().currentUser?.uid)
                .update({
                    ['jobsCreated']: firestore.FieldValue.arrayUnion(
                        details.job
                    ),
                })

            return { status: requestStatus.SUCCESS }
        } catch (error: Object | any) {
            return {
                status: requestStatus.ERROR,
                errorCode: error.code,
            }
        }
    }

    getJob = async (details: { jobId: string }): Promise<promiseType> => {
        try {
            const doc = await firestore()
                .collection('jobs')
                .doc(details.jobId)
                .get()

            if (doc.exists) {
                return {
                    status: requestStatus.SUCCESS,
                    data: doc.data() as jobType,
                }
            } else {
                return { status: requestStatus.ERROR }
            }
        } catch (error: Object | any) {
            return { status: requestStatus.ERROR, errorCode: error.code }
        }
    }

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
}

export default new Job()
