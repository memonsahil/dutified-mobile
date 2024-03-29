import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import jobModalProps from '../props/jobModalProps'
import utilStore from '../../state/stores/utilStore'
import jobStatus from '../../enums/jobStatus'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import screens from '../../screens/params/screens'

const JobModal = (props: jobModalProps) => {
    const [jobId, setJobId] = useState<string>('123')
    const [jobName, setJobName] = useState<string>('Job Name')
    const [category, setCategory] = useState<string>('Category Name')
    const [payment, setPayment] = useState<string>('200')
    const [status, setStatus] = useState<jobStatus>(jobStatus.AVAILABLE)
    const [creationDate, setCreationDate] = useState<string>('2021-01-01')
    const [jobDesc, setJobDesc] = useState<string>(
        'Lorem ipsum dolor sit amet, nisl eget ali quam, sit ame sit ame. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.'
    )
    const [projectId, setProjectId] = useState<string>('123')
    const [projectName, setProjectName] = useState<string>('Project Name')
    const [jobCreatorId, setJobCreatorId] = useState<string>('456')
    const [jobCreator, setJobCreator] = useState<string>('Job Creator Name')
    const [loading, setLoading] = useState<boolean>(false)
    const currentUser = 'First Last'

    const { setShowAgreementModal, setShowJobModal } = utilStore(
        (state) => state
    )

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <Modal transparent visible={props.visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Job</Text>
                        <TouchableOpacity
                            onPress={() => {
                                props.onClose()
                                setShowAgreementModal(true)
                            }}
                        >
                            <MaterialCommunityIcons
                                name="close-circle"
                                size={28}
                                color={themeColors.GREEN}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.jobSection}>
                        <Text style={styles.detail}>{jobName}</Text>
                        <Text style={styles.detail}>{creationDate}</Text>
                        <View style={styles.detailSection}>
                            <Text style={styles.jobDetail}>{category}</Text>
                        </View>
                        <View style={styles.detailSection}>
                            <Text style={styles.jobDetail}>${payment}</Text>
                            <Text style={styles.jobDetail}>{status}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowJobModal(false)
                                navigation.navigate('Project', {
                                    projectId: projectId,
                                })
                            }}
                        >
                            <Text style={styles.infoButton}>{projectName}</Text>
                        </TouchableOpacity>
                        <Text style={styles.jobDesc}>{jobDesc}</Text>
                        {jobCreator === `${currentUser}` ? null : (
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowJobModal(false)
                                        navigation.navigate('User', {
                                            userId: jobCreatorId,
                                        })
                                    }}
                                >
                                    <Text style={styles.infoButton}>
                                        {jobCreator}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: themeColors.BLACK,
        width: '100%',
        height: '80%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    headingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '5%',
        paddingHorizontal: '5%',
        paddingBottom: '5%',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.WHITE,
    },
    jobSection: {
        flexGrow: 1,
        paddingBottom: '20%',
        alignItems: 'flex-start',
    },
    detail: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingHorizontal: '5%',
        paddingBottom: '5%',
    },
    detailSection: {
        flexDirection: 'row',
        paddingHorizontal: '5%',
        marginBottom: '5%',
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
        paddingHorizontal: '5%',
        marginBottom: '5%',
    },
    jobDesc: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingHorizontal: '5%',
        alignSelf: 'center',
        paddingBottom: '5%',
    },
})

export default JobModal
