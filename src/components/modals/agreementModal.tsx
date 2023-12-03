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
import categories from '../../enums/categories'
import jobStatus from '../../enums/jobStatus'
import JobCard from '../cards/jobCard'
import jobCardProps from '../props/jobCardProps'

const AgreementModal = (props: agreementModalProps) => {
    const jobs: Array<jobCardProps> = [
        {
            jobId: '5',
            jobName: 'A very very long job name that will be cut off',
            status: jobStatus.AVAILABLE,
            payment: '100000',
            description:
                'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ACCOUNTING,
            showPlus: true,
        },
        {
            jobId: '6',
            jobName: 'Created Job 2',
            status: jobStatus.IN_PROGRESS,
            payment: '200',
            description: 'This is a description for Created job 2',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: true,
        },
        {
            jobId: '7',
            jobName: 'Created Job 3',
            status: jobStatus.COMPLETED,
            payment: '200',
            description: 'This is a description for Created job 3',
            creationDate: '2021-01-01',
            category: categories.ANIMATION,
            showPlus: true,
        },
    ]

    return (
        <Modal transparent visible={props.visible} animationType="slide">
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={styles.headingContainer}>
                        <Text style={styles.heading}>Job Agreement</Text>
                        <TouchableOpacity onPress={() => props.onClose()}>
                            <MaterialCommunityIcons
                                name="close-circle"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={styles.mainSection}>
                        <Text style={styles.info}>
                            Select a job and create an agreement between you and{' '}
                            {props.userName}.
                        </Text>
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
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {jobs.map((job) => (
                                            <JobCard
                                                key={job.jobId}
                                                jobId={job.jobId}
                                                jobName={job.jobName}
                                                status={job.status}
                                                payment={job.payment}
                                                description={job.description}
                                                creationDate={job.creationDate}
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
                        <Text style={styles.subHeading}>
                            {props.userName}'s Jobs
                        </Text>
                        {jobs.length === 0 ? (
                            <Text style={styles.noDataText}>
                                {props.userName} does not have any available
                                jobs.
                            </Text>
                        ) : (
                            <>
                                {jobs.length !== 0 ? (
                                    <ScrollView
                                        contentContainerStyle={
                                            styles.jobsContainer
                                        }
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {jobs.map((job) => (
                                            <JobCard
                                                key={job.jobId}
                                                jobId={job.jobId}
                                                jobName={job.jobName}
                                                status={job.status}
                                                payment={job.payment}
                                                description={job.description}
                                                creationDate={job.creationDate}
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
        fontSize: fontSizes.HEADING_THREE,
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
})

export default AgreementModal
