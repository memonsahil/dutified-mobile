import { useState } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import JobCard from '../../components/cards/jobCard'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import jobCardProps from '../../components/props/jobCardProps'
import jobStatus from '../../enums/jobStatus'
import categories from '../../enums/categories'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const WorkScreen = () => {
    const [switchColumn, setSwitchColumn] = useState<'Hired' | 'Created'>(
        'Hired'
    )
    const navigation: NavigationProp<screens> = useNavigation()
    const jobsCreated: Array<jobCardProps> = [
        {
            jobId: '1',
            jobName: 'Created Job 1',
            status: jobStatus.AVAILABLE,
            payment: '100000',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            dueDate: '2021-01-01',
            category: categories.ACCOUNTING,
        },
        {
            jobId: '2',
            jobName: 'Created Job 2',
            status: jobStatus.IN_PROGRESS,
            payment: '200',
            description: 'This is a description for Created job 2',
            dueDate: '2021-01-01',
            category: categories.ADVERTISING,
        },
    ]
    const jobsHired: Array<jobCardProps> = [
        {
            jobId: '1',
            jobName: 'Created Job 1',
            status: jobStatus.AVAILABLE,
            payment: '100000',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            dueDate: '2021-01-01',
            category: categories.ACCOUNTING,
        },
        {
            jobId: '2',
            jobName: 'Created Job 2',
            status: jobStatus.IN_PROGRESS,
            payment: '200',
            description: 'This is a description for Created job 2',
            dueDate: '2021-01-01',
            category: categories.ADVERTISING,
        },
        {
            jobId: '3',
            jobName: 'Created Job 3',
            status: jobStatus.COMPLETED,
            payment: '200',
            description: 'This is a description for Created job 3',
            dueDate: '2021-01-01',
            category: categories.ANIMATION,
        },
    ]

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>Work</Text>
                    <TouchableOpacity onPress={() => {}}>
                        <MaterialCommunityIcons
                            name="briefcase-plus"
                            size={30}
                            color={themeColors.YELLOW_GREEN}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonSection}>
                    <TouchableOpacity onPress={() => setSwitchColumn('Hired')}>
                        <Text
                            style={{
                                ...styles.button,
                                color:
                                    switchColumn === 'Hired'
                                        ? themeColors.YELLOW_GREEN
                                        : themeColors.SILVER,
                            }}
                        >
                            Hired
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSwitchColumn('Created')}
                    >
                        <Text
                            style={{
                                ...styles.button,
                                color:
                                    switchColumn === 'Created'
                                        ? themeColors.YELLOW_GREEN
                                        : themeColors.SILVER,
                            }}
                        >
                            Created
                        </Text>
                    </TouchableOpacity>
                </View>
                {switchColumn === 'Hired' ? (
                    <>
                        {jobsHired.length === 0 ? (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    Jobs that you are hired for will be shown
                                    here.
                                </Text>
                            </View>
                        ) : (
                            <>
                                {jobsHired.map((job) => (
                                    <JobCard
                                        key={job.jobId}
                                        nav={navigation}
                                        jobId={job.jobId}
                                        jobName={job.jobName}
                                        status={job.status}
                                        payment={job.payment}
                                        description={job.description}
                                        dueDate={job.dueDate}
                                        category={job.category}
                                    />
                                ))}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {jobsCreated.length === 0 ? (
                            <View style={styles.noDataContainer}>
                                <Text style={styles.noDataText}>
                                    Jobs that you create will be shown here.
                                </Text>
                            </View>
                        ) : (
                            <>
                                {jobsCreated.map((job) => (
                                    <JobCard
                                        key={job.jobId}
                                        nav={navigation}
                                        jobId={job.jobId}
                                        jobName={job.jobName}
                                        status={job.status}
                                        payment={job.payment}
                                        description={job.description}
                                        dueDate={job.dueDate}
                                        category={job.category}
                                    />
                                ))}
                            </>
                        )}
                    </>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.BLACK,
    },
    scrollView: {
        alignItems: 'center',
        paddingBottom: '20%',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: '10%',
        paddingRight: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
    },
    buttonSection: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between',
        paddingTop: '5%',
        marginBottom: '5%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingTop: '10%',
        paddingBottom: '10%',
        textAlign: 'center',
    },
})

export default WorkScreen
