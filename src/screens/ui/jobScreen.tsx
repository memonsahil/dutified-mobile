import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import jobScreenProps from '../props/jobScreenProps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import jobStatus from '../../enums/jobStatus'
import promiseType from '../../data/types/promiseType'
import job from '../../data/classes/job'
import requestStatus from '../../enums/requestStatus'
import authStore from '../../state/stores/authStore'

const JobScreen = ({ route }: jobScreenProps) => {
    const { jobId } = route.params

    const [jobName, setJobName] = useState<string>('')
    const [jobCreatorId, setJobCreatorId] = useState<string>('')
    const [jobCreator, setJobCreator] = useState<string>('')
    const [projectId, setProjectId] = useState<string>('')
    const [projectName, setProjectName] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [payment, setPayment] = useState<string>('')
    const [status, setStatus] = useState<jobStatus>()
    const [creationDate, setCreationDate] = useState<Date>()
    const [jobDesc, setJobDesc] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)

    const currentUser = authStore((state) => state.currentUser)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        job.getJob({ jobId: jobId }).then((response: promiseType) => {
            if (response.status === requestStatus.SUCCESS && response.data) {
                setJobName(response.data.jobName)
                setJobCreatorId(response.data.jobCreatorId)
                setJobCreator(response.data.jobCreator)
                setProjectId(response.data.projectId)
                setProjectName(response.data.projectName)
                setCategory(response.data.category)
                setPayment(response.data.payment)
                setStatus(response.data.status)
                setCreationDate(response.data.creationDate)
                setJobDesc(response.data.description)
                setLoading(false)
            } else {
                Alert.alert(
                    'Error Occurred',
                    'Please contact our support team.',
                    [
                        {
                            text: 'Dismiss',
                            onPress: () => {},
                        },
                    ]
                )
            }
        })
    }, [jobId])

    return (
        <View style={styles.container}>
            {loading === false ? (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.headerSection}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                                name="chevron-left-circle"
                                size={26}
                                color={themeColors.GREEN}
                            />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Job</Text>
                    </View>
                    <Text style={styles.detail}>{jobName}</Text>
                    <Text style={styles.detail}>
                        {creationDate?.toString()}
                    </Text>
                    <View style={styles.detailSection}>
                        <Text style={styles.jobDetail}>{category}</Text>
                    </View>
                    <View style={styles.detailSection}>
                        <Text style={styles.jobDetail}>${payment}</Text>
                        <Text style={styles.jobDetail}>{status}</Text>
                    </View>
                    {projectId !== '' ? (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('Project', {
                                    projectId: projectId,
                                })
                            }
                        >
                            <Text style={styles.infoButton}>{projectName}</Text>
                        </TouchableOpacity>
                    ) : null}
                    <Text style={styles.jobDesc}>{jobDesc}</Text>
                    {jobCreatorId === currentUser?.profile.userId ? null : (
                        <>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('User', {
                                        userId: jobCreatorId,
                                    })
                                }
                            >
                                <Text style={styles.infoButton}>
                                    {jobCreator}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Chat', {
                                        userId: jobCreatorId,
                                    })
                                }
                                style={styles.chatButtonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="message-text"
                                    size={26}
                                    color={themeColors.GREEN}
                                    style={styles.buttonIcon}
                                />
                                <Text style={styles.chatButton}>Chat</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </ScrollView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={themeColors.GREEN}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.BLACK,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'flex-start',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: '10%',
        paddingRight: '10%',
        width: '100%',
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
        paddingLeft: '5%',
    },
    detail: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingHorizontal: '10%',
        paddingTop: '5%',
    },
    detailSection: {
        flexDirection: 'row',
        marginLeft: '10%',
        marginTop: '5%',
    },
    jobDetail: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.GREEN,
        padding: '1%',
        marginRight: '5%',
    },
    infoButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.GREEN,
        marginHorizontal: '10%',
        marginTop: '5%',
    },
    jobDesc: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        width: '80%',
        alignSelf: 'center',
        paddingTop: '5%',
    },
    chatButtonWrapper: {
        alignItems: 'center',
        marginTop: '5%',
        flexDirection: 'row',
        alignSelf: 'center',
    },
    chatButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.GREEN,
    },
    buttonIcon: {
        marginRight: '3%',
    },
})

export default JobScreen
