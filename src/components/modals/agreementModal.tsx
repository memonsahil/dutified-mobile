import { useEffect, useState } from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    TextInput,
} from 'react-native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import agreementModalProps from '../props/agreementModalProps'
import categories from '../../enums/categories'
import jobStatus from '../../enums/jobStatus'
import JobCard from '../cards/jobCard'
import jobCardProps from '../props/jobCardProps'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import selection from '../../enums/selections'
import utilStore from '../../state/stores/utilStore'

const AgreementModal = (props: agreementModalProps) => {
    const [updatedAmount, setUpdatedAmount] = useState<string>('')
    const { selectedJob, setSelectedJob } = utilStore((state) => state)

    useEffect(() => {
        setUpdatedAmount(selectedJob?.payment!)
    }, [selectedJob])

    const jobs: Array<jobCardProps> = [
        {
            jobId: '5',
            jobName: 'Created Job 1',
            status: jobStatus.AVAILABLE,
            payment: '100000',
            description:
                'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ACCOUNTING,
            showPlus: selection.AGREEMENT,
        },
        {
            jobId: '6',
            jobName: 'Created Job 2',
            status: jobStatus.IN_PROGRESS,
            payment: '200',
            description: 'This is a description for Created job 2',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: selection.AGREEMENT,
        },
        {
            jobId: '7',
            jobName: 'Created Job 3',
            status: jobStatus.COMPLETED,
            payment: '200',
            description: 'This is a description for Created job 3',
            creationDate: '2021-01-01',
            category: categories.ANIMATION,
            showPlus: selection.AGREEMENT,
        },
        {
            jobId: '8',
            jobName: 'Created Job 4',
            status: jobStatus.COMPLETED,
            payment: '200',
            description: 'This is a description for Created job 3',
            creationDate: '2021-01-01',
            category: categories.ANIMATION,
            showPlus: selection.AGREEMENT,
        },
        {
            jobId: '9',
            jobName: 'Created Job 5',
            status: jobStatus.COMPLETED,
            payment: '200',
            description: 'This is a description for Created job 3',
            creationDate: '2021-01-01',
            category: categories.ANIMATION,
            showPlus: selection.AGREEMENT,
        },
    ]

    return (
        <Modal transparent visible={props.visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Job Agreement</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedJob(null)
                                props.onClose()
                            }}
                        >
                            <MaterialCommunityIcons
                                name="close-circle"
                                size={28}
                                color={themeColors.GREEN}
                            />
                        </TouchableOpacity>
                    </View>
                    <KeyboardAwareScrollView
                        contentContainerStyle={styles.mainSection}
                    >
                        <Text style={styles.info}>
                            Pick a job and create an agreement between you and{' '}
                            {props.userName}.
                        </Text>
                        {selectedJob !== null ? (
                            <>
                                <Text style={styles.subHeading}>
                                    Selected Job
                                </Text>
                                <JobCard
                                    key={selectedJob.jobId}
                                    jobId={selectedJob.jobId}
                                    jobName={selectedJob.jobName}
                                    status={selectedJob.status}
                                    payment={selectedJob.payment}
                                    description={selectedJob.description}
                                    creationDate={selectedJob.creationDate}
                                    category={selectedJob.category}
                                    showPlus={selection.SELECTED}
                                    additionalStyle={{
                                        marginBottom: '5%',
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedJob(null)
                                    }}
                                    style={styles.modalButtonWrapper}
                                >
                                    <MaterialCommunityIcons
                                        name="briefcase-edit"
                                        size={28}
                                        color={themeColors.GREEN}
                                        style={styles.iconButton}
                                    />
                                    <Text style={styles.modalButton}>
                                        Change
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.subHeading}>
                                    Payment Amount
                                </Text>
                                <Text style={styles.info}>
                                    You can negotiate the payment amount for
                                    this job.
                                </Text>
                                <View style={styles.amountWrapper}>
                                    <Text style={styles.currency}>USD</Text>
                                    <TextInput
                                        placeholder="120"
                                        value={updatedAmount}
                                        onChangeText={setUpdatedAmount}
                                        style={styles.amountInput}
                                        placeholderTextColor={
                                            themeColors.SILVER
                                        }
                                        inputMode="decimal"
                                    />
                                </View>
                                {updatedAmount !== selectedJob.payment ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setUpdatedAmount(
                                                selectedJob.payment
                                            )
                                        }}
                                        style={styles.modalButtonWrapper}
                                    >
                                        <MaterialCommunityIcons
                                            name="square-edit-outline"
                                            size={28}
                                            color={themeColors.GREEN}
                                            style={styles.iconButton}
                                        />
                                        <Text style={styles.modalButton}>
                                            Reset
                                        </Text>
                                    </TouchableOpacity>
                                ) : null}
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedJob(null)
                                        props.onClose()
                                    }}
                                    style={styles.modalButtonWrapper}
                                >
                                    <MaterialCommunityIcons
                                        name="handshake"
                                        size={28}
                                        color={themeColors.GREEN}
                                        style={styles.iconButton}
                                    />
                                    <Text style={styles.modalButton}>
                                        {updatedAmount !== selectedJob.payment
                                            ? 'Negotiate'
                                            : 'Send Agreement'}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.textSection}>
                                    The updated payment amount has to be
                                    accepted by {props.userName}.
                                </Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.subHeading}>
                                    {props.userName}'s Jobs
                                </Text>
                                {jobs.length === 0 ? (
                                    <Text style={styles.noDataText}>
                                        {props.userName} does not have any
                                        available jobs.
                                    </Text>
                                ) : (
                                    <>
                                        {jobs.length !== 0 ? (
                                            <ScrollView
                                                contentContainerStyle={
                                                    styles.jobsContainer
                                                }
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={
                                                    false
                                                }
                                                pagingEnabled={true}
                                                decelerationRate="fast"
                                                snapToInterval={370}
                                            >
                                                {jobs.map((job) => (
                                                    <JobCard
                                                        key={job.jobId}
                                                        jobId={job.jobId}
                                                        jobName={job.jobName}
                                                        status={job.status}
                                                        payment={job.payment}
                                                        description={
                                                            job.description
                                                        }
                                                        creationDate={
                                                            job.creationDate
                                                        }
                                                        category={job.category}
                                                        showPlus={job.showPlus}
                                                        additionalStyle={{
                                                            width: 350,
                                                            marginRight: 20,
                                                        }}
                                                    />
                                                ))}
                                            </ScrollView>
                                        ) : null}
                                    </>
                                )}
                                <Text style={styles.subHeading}>Your Jobs</Text>
                                {jobs.length === 0 ? (
                                    <Text style={styles.noDataText}>
                                        You do not have any available jobs.
                                    </Text>
                                ) : (
                                    <>
                                        {jobs.length !== 0 ? (
                                            <ScrollView
                                                contentContainerStyle={
                                                    styles.jobsContainer
                                                }
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={
                                                    false
                                                }
                                                pagingEnabled={true}
                                                decelerationRate="fast"
                                                snapToInterval={370}
                                            >
                                                {jobs.map((job) => (
                                                    <JobCard
                                                        key={job.jobId}
                                                        jobId={job.jobId}
                                                        jobName={job.jobName}
                                                        status={job.status}
                                                        payment={job.payment}
                                                        description={
                                                            job.description
                                                        }
                                                        creationDate={
                                                            job.creationDate
                                                        }
                                                        category={job.category}
                                                        showPlus={job.showPlus}
                                                        additionalStyle={{
                                                            width: 350,
                                                            marginRight: 20,
                                                        }}
                                                    />
                                                ))}
                                            </ScrollView>
                                        ) : null}
                                    </>
                                )}
                            </>
                        )}
                    </KeyboardAwareScrollView>
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
    mainSection: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: '20%',
    },
    info: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingHorizontal: '5%',
        marginBottom: '5%',
    },
    jobsContainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        borderBottomColor: themeColors.SILVER,
        marginBottom: '5%',
    },
    subHeading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.WHITE,
        marginBottom: '5%',
        paddingHorizontal: '5%',
        alignSelf: 'flex-start',
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        marginBottom: '5%',
        paddingHorizontal: '5%',
        alignSelf: 'flex-start',
    },
    modalButtonWrapper: {
        flexDirection: 'row',
    },
    iconButton: {
        marginRight: '3%',
    },
    modalButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.GREEN,
        alignSelf: 'center',
        marginBottom: '5%',
    },
    amountWrapper: {
        flexDirection: 'row',
        width: '80%',
        marginBottom: '10%',
    },
    currency: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '20%',
        textAlignVertical: 'center',
    },
    amountInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '80%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 1,
        textAlignVertical: 'center',
    },
    textSection: {
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: '5%',
        width: '80%',
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.WHITE,
    },
})

export default AgreementModal
