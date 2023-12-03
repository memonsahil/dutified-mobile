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
import agreementModalProps from '../props/agreementModalProps'
import globalStore from '../../state/stores/globalStore'
import jobStatus from '../../enums/jobStatus'
import categories from '../../enums/categories'

const AgreementModal = (props: agreementModalProps) => {
    const { selectedJob, setSelectedJob } = globalStore((state) => state)

    return (
        <Modal transparent visible={props.visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Job Agreement</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedJob({
                                    jobId: '',
                                    jobName: '',
                                    projectId: '',
                                    projectName: '',
                                    jobCreatorId: '',
                                    jobCreator: '',
                                    jobWorkerId: '',
                                    jobWorker: '',
                                    status: jobStatus.AVAILABLE,
                                    category: categories.OTHER,
                                    payment: '',
                                    description: '',
                                    creationDate: '',
                                    dueDate: '',
                                })
                                props.onClose
                            }}
                        >
                            <MaterialCommunityIcons
                                name="close-circle"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.mainSection}>
                        <Text style={styles.info}>
                            Select your preferred job and create an agreement
                            between you and {props.userName}.
                        </Text>
                        <View style={styles.buttonSection}>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={styles.button}>
                                    Your Available Jobs
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={styles.button}>
                                    {props.userName}'s Available Jobs
                                </Text>
                            </TouchableOpacity>
                        </View>
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
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: themeColors.BLACK,
        width: '100%',
        height: '80%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
    mainSection: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: '20%',
        paddingHorizontal: '5%',
    },
    info: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
    },
    buttonSection: {
        alignItems: 'center',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_THREE,
        color: themeColors.YELLOW_GREEN,
        paddingTop: '5%',
    },
})

export default AgreementModal
