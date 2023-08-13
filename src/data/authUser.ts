import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import requestStatus from '../enums/requestStatus'
import AuthUserInterface from '../interfaces/actions/authUserInterface'
import authUserState from '../interfaces/state/authUserState'
import jobState from '../interfaces/state/jobState'
import projectState from '../interfaces/state/projectState'

class AuthUser implements AuthUserInterface {
    async signUp(details: {
        firstName: string
        lastName: string
        countryCode: string
        phoneNumber: string
        emailAddress: string
        accPassword: string
    }) {
        return await auth()
            .createUserWithEmailAndPassword(
                details.emailAddress,
                details.accPassword
            )
            .then(async () => {
                await firestore()
                    .collection('allUsers')
                    .add({
                        userDetails: {
                            userId: auth().currentUser?.uid as string,
                            firstName: details.firstName,
                            lastName: details.lastName,
                            imageSrc: '',
                            countryCode: details.countryCode,
                            phoneNumber: details.phoneNumber,
                            emailAddress: details.emailAddress,
                        },
                        projects: [],
                        jobs: [],
                        feedbacks: [],
                        workSetup: {
                            preferredCategories: [],
                            totalJobs: '',
                        },
                    })

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch((error) => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                    errorCode: error.code,
                })
            })
    }

    async signIn(details: { emailAddress: string; accPassword: string }) {
        return await auth()
            .signInWithEmailAndPassword(
                details.emailAddress,
                details.accPassword
            )
            .then(() => {
                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch((error) => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                    errorCode: error.code,
                })
            })
    }

    async getAuthUser() {
        let data: FirebaseFirestoreTypes.DocumentData[] = []

        return await firestore()
            .collection('allUsers')
            .where('userDetails.userId', '==', auth().currentUser?.uid)
            .limit(1)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
                })

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                    data: data[0] as authUserState,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    async signOut() {
        return await auth()
            .signOut()
            .then(() => {
                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    async setImage(imageSrc: string) {
        let userRef: FirebaseFirestoreTypes.DocumentReference

        return await firestore()
            .collection('allUsers')
            .where(
                'userDetails.userId',
                '==',
                auth().currentUser?.uid as string
            )
            .limit(1)
            .get()
            .then(async (querySnapshot) => {
                userRef = querySnapshot.docs[0].ref

                await userRef.update({
                    'userDetails.imageSrc': imageSrc,
                })

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    async setPhone(details: { countryCode: string; phoneNumber: string }) {
        let userRef: FirebaseFirestoreTypes.DocumentReference

        return await firestore()
            .collection('allUsers')
            .where(
                'userDetails.userId',
                '==',
                auth().currentUser?.uid as string
            )
            .limit(1)
            .get()
            .then(async (querySnapshot) => {
                userRef = querySnapshot.docs[0].ref

                await userRef.update({
                    'userDetails.countryCode': details.countryCode,
                    'userDetails.phoneNumber': details.phoneNumber,
                })

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    async setEmail(emailAddress: string) {
        let user: FirebaseAuthTypes.User = auth()
            .currentUser as FirebaseAuthTypes.User
        let userRef: FirebaseFirestoreTypes.DocumentReference

        return await user
            .updateEmail(emailAddress)
            .then(async () => {
                await firestore()
                    .collection('allUsers')
                    .where(
                        'userDetails.userId',
                        '==',
                        auth().currentUser?.uid as string
                    )
                    .limit(1)
                    .get()
                    .then(async (querySnapshot) => {
                        userRef = querySnapshot.docs[0].ref

                        await userRef.update({
                            'userDetails.emailAddress': emailAddress,
                        })
                    })

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    async setPassword(details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }) {
        let user: FirebaseAuthTypes.User = auth()
            .currentUser as FirebaseAuthTypes.User
        let credential: FirebaseAuthTypes.AuthCredential =
            auth.EmailAuthProvider.credential(
                details.emailAddress,
                details.currentPassword
            )

        return await user
            .reauthenticateWithCredential(credential)
            .then(async () => {
                await user.updatePassword(details.newPassword)

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    async setWorkSetup(details: {
        preferredCategories: string[]
        totalJobs: string
    }) {
        let userRef: FirebaseFirestoreTypes.DocumentReference

        return await firestore()
            .collection('allUsers')
            .where(
                'userDetails.userId',
                '==',
                auth().currentUser?.uid as string
            )
            .limit(1)
            .get()
            .then(async (querySnapshot) => {
                userRef = querySnapshot.docs[0].ref

                await userRef.update({
                    'workSetup.preferredCategories':
                        details.preferredCategories,
                    'workSetup.totalJobs': details.totalJobs,
                })

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    async addProject(details: projectState) {
        let userDoc: FirebaseFirestoreTypes.QueryDocumentSnapshot
        let userRef: FirebaseFirestoreTypes.DocumentReference
        let newProjects: Array<projectState> = []

        return await firestore()
            .collection('allUsers')
            .where(
                'userDetails.userId',
                '==',
                auth().currentUser?.uid as string
            )
            .limit(1)
            .get()
            .then(async (querySnapshot) => {
                userDoc = querySnapshot.docs[0]
                userRef = userDoc.ref

                newProjects = [
                    ...userDoc.data().projects,
                    {
                        projectId: details.projectId,
                        projectName: details.projectName,
                        projectCreatorId: details.projectCreatorId,
                        projectCreator: details.projectCreator,
                        category: details.category,
                        projectDesc: details.projectDesc,
                    },
                ]

                await userRef.update({ projects: newProjects })

                await firestore().collection('allProjects').add({
                    projectId: details.projectId,
                    projectName: details.projectName,
                    projectCreatorId: details.projectCreatorId,
                    projectCreator: details.projectCreator,
                    category: details.category,
                    projectDesc: details.projectDesc,
                })

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }

    async addJob(details: jobState) {
        let userDoc: FirebaseFirestoreTypes.QueryDocumentSnapshot
        let userRef: FirebaseFirestoreTypes.DocumentReference
        let newJobs: Array<jobState> = []

        return await firestore()
            .collection('allUsers')
            .where(
                'userDetails.userId',
                '==',
                auth().currentUser?.uid as string
            )
            .limit(1)
            .get()
            .then(async (querySnapshot) => {
                userDoc = querySnapshot.docs[0]
                userRef = userDoc.ref

                newJobs = [
                    ...userDoc.data().jobs,
                    {
                        jobId: details.jobId,
                        jobName: details.jobName,
                        projectId: details.projectId,
                        projectName: details.projectName,
                        jobCreatorId: details.jobCreatorId,
                        jobCreator: details.jobCreator,
                        jobWorkerId: details.jobWorkerId,
                        jobWorker: details.jobWorker,
                        category: details.category,
                        payment: details.payment,
                        status: details.status,
                        deadline: details.deadline,
                        jobDesc: details.jobDesc,
                    },
                ]

                await userRef.update({ jobs: newJobs })

                await firestore().collection('allJobs').add({
                    jobId: details.jobId,
                    jobName: details.jobName,
                    projectId: details.projectId,
                    projectName: details.projectName,
                    jobCreatorId: details.jobCreatorId,
                    jobCreator: details.jobCreator,
                    jobWorkerId: details.jobWorkerId,
                    jobWorker: details.jobWorker,
                    category: details.category,
                    payment: details.payment,
                    status: details.status,
                    deadline: details.deadline,
                    jobDesc: details.jobDesc,
                })

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    }
}

export default new AuthUser()
