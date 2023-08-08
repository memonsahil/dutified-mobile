import { Dispatch, SetStateAction } from 'react'
import { create } from 'zustand'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore, {
    FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import authUserState from '../interfaces/state/authUserState'
import authUserActions from '../interfaces/actions/authUserActions'
import requestStatus from '../enums/requestStatus'
import projectState from '../interfaces/state/projectState'
import jobState from '../interfaces/state/jobState'
import { IMessage } from 'react-native-gifted-chat'
import chatState from '../interfaces/state/chatState'

const initialState: authUserState = {
    userDetails: {
        userId: '',
        firstName: '',
        lastName: '',
        imageSrc: '',
        countryCode: '',
        phoneNumber: '',
        emailAddress: '',
    },
    projects: [],
    jobs: [],
    feedbacks: [],
    workSetup: {
        preferredCategories: [],
        totalJobs: '',
    },
}

const useAuthUserStore = create<authUserState & authUserActions>()((set) => ({
    ...initialState,
    signUp: async (details: {
        firstName: string
        lastName: string
        countryCode: string
        phoneNumber: string
        emailAddress: string
        accPassword: string
    }) => {
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
                    .then(() => {
                        set((state) => ({
                            ...state,
                            userDetails: {
                                ...state.userDetails,
                                userId: auth().currentUser?.uid as string,
                                firstName: details.firstName,
                                lastName: details.lastName,
                                imageSrc: '',
                                countryCode: details.countryCode,
                                phoneNumber: details.phoneNumber,
                                emailAddress: details.emailAddress,
                            },
                        }))
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
    },
    signIn: async (details: { emailAddress: string; accPassword: string }) => {
        let userData: authUserState

        return await auth()
            .signInWithEmailAndPassword(
                details.emailAddress,
                details.accPassword
            )
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
                    .then((querySnapshot) => {
                        userData = querySnapshot.docs[0].data() as authUserState

                        set((state) => ({
                            ...state,
                            userDetails: {
                                ...state.userDetails,
                                userId: userData.userDetails.userId,
                                firstName: userData.userDetails.firstName,
                                lastName: userData.userDetails.lastName,
                                imageSrc: userData.userDetails.imageSrc,
                                countryCode: userData.userDetails.countryCode,
                                phoneNumber: userData.userDetails.phoneNumber,
                                emailAddress: userData.userDetails.emailAddress,
                            },
                            projects: userData.projects,
                            jobs: userData.jobs,
                            feedbacks: userData.feedbacks,
                            workSetup: {
                                ...state.workSetup,
                                preferredCategories:
                                    userData.workSetup.preferredCategories,
                                totalJobs: userData.workSetup.totalJobs,
                            },
                        }))
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
    },
    signOut: async () => {
        return await auth()
            .signOut()
            .then(() => {
                set(initialState)

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    },
    getAuthUserData: async () => {
        let authUserData: authUserState

        return await firestore()
            .collection('allUsers')
            .where(
                'userDetails.userId',
                '==',
                auth().currentUser?.uid as string
            )
            .limit(1)
            .get()
            .then((querySnapshot) => {
                authUserData = querySnapshot.docs[0].data() as authUserState

                set((state) => ({
                    ...state,
                    userDetails: {
                        ...state.userDetails,
                        userId: authUserData.userDetails.userId,
                        firstName: authUserData.userDetails.firstName,
                        lastName: authUserData.userDetails.lastName,
                        imageSrc: authUserData.userDetails.imageSrc,
                        countryCode: authUserData.userDetails.countryCode,
                        phoneNumber: authUserData.userDetails.phoneNumber,
                        emailAddress: authUserData.userDetails.emailAddress,
                    },
                    projects: authUserData.projects,
                    jobs: authUserData.jobs,
                    feedbacks: authUserData.feedbacks,
                    workSetup: {
                        ...state.workSetup,
                        preferredCategories:
                            authUserData.workSetup.preferredCategories,
                        totalJobs: authUserData.workSetup.totalJobs,
                    },
                }))

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    },
    updateImage: async (imageSrc: string) => {
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

                set((state) => ({
                    ...state,
                    userDetails: {
                        ...state.userDetails,
                        imageSrc: imageSrc,
                    },
                }))

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    },
    updatePhone: async (details: {
        countryCode: string
        phoneNumber: string
    }) => {
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

                set((state) => ({
                    ...state,
                    userDetails: {
                        ...state.userDetails,
                        countryCode: details.countryCode,
                        phoneNumber: details.phoneNumber,
                    },
                }))

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    },
    updateEmail: async (emailAddress: string) => {
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

                set((state) => ({
                    ...state,
                    userDetails: {
                        ...state.userDetails,
                        emailAddress: emailAddress,
                    },
                }))

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    },
    updatePassword: async (details: {
        emailAddress: string
        currentPassword: string
        newPassword: string
    }) => {
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
    },
    addProject: async (details: projectState) => {
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

                set((state) => ({
                    ...state,
                    projects: [
                        ...state.projects,
                        {
                            projectId: details.projectId,
                            projectName: details.projectName,
                            projectCreatorId: details.projectCreatorId,
                            projectCreator: details.projectCreator,
                            category: details.category,
                            projectDesc: details.projectDesc,
                        },
                    ],
                }))

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    },
    addJob: async (details: jobState) => {
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

                set((state) => ({
                    ...state,
                    jobs: [
                        ...state.jobs,
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
                    ],
                }))

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    },
    saveWorkSetup: async (details: {
        preferredCategories: string[]
        totalJobs: string
    }) => {
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

                set((state) => ({
                    ...state,
                    workSetup: {
                        ...state.workSetup,
                        preferredCategories: details.preferredCategories,
                        totalJobs: details.totalJobs,
                    },
                }))

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    },
    sendMessage: async (details: {
        chatId: string
        senderUserId: string
        receiverUserId: string
        messages: IMessage[]
    }) => {
        let messagesData: Array<IMessage> = []

        return await firestore()
            .collection('allChats')
            .doc(details.chatId)
            .get()
            .then(async (querySnapshot) => {
                if (querySnapshot.exists) {
                    messagesData = [
                        ...querySnapshot.data()?.messages,
                        details.messages[details.messages.length - 1],
                    ]

                    await querySnapshot.ref.update({
                        messages: messagesData,
                    })
                } else {
                    await querySnapshot.ref.set({
                        chatId: details.chatId,
                        senderUserId: details.senderUserId,
                        receiverUserId: details.receiverUserId,
                        messages: details.messages,
                    })
                }

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    },
    getMessages: (details: {
        chatId: string
        setState: Dispatch<SetStateAction<IMessage[]>>
    }) => {
        let messages: Array<IMessage> = []

        return firestore()
            .collection('allChats')
            .doc(details.chatId)
            .onSnapshot((querySnapshot) => {
                messages = querySnapshot
                    .data()
                    ?.messages.map(
                        (message: {
                            createdAt: FirebaseFirestoreTypes.Timestamp
                        }) => {
                            return {
                                ...message,
                                createdAt: message.createdAt.toDate(),
                            }
                        }
                    )
                    .reverse() as Array<IMessage>

                details.setState(messages)
            })
    },
    getAllChats: async (userId: string) => {
        let chats: chatState[] = []

        return await firestore()
            .collection('allChats')
            .get()
            .then((querySnapshot) => {
                querySnapshot.docs.filter((doc) => {
                    doc.id.includes(userId)
                        ? chats.push(doc.data() as chatState)
                        : null
                })

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                    data: chats,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    },
    getChat: async (chatId: string) => {
        let chat: chatState

        return await firestore()
            .collection('allChats')
            .doc(chatId)
            .get()
            .then((querySnapshot) => {
                chat = querySnapshot.data() as chatState

                return Promise.resolve({
                    status: requestStatus.SUCCESS,
                    data: chat,
                })
            })
            .catch(() => {
                return Promise.reject({
                    status: requestStatus.ERROR,
                })
            })
    },
}))

export default useAuthUserStore
