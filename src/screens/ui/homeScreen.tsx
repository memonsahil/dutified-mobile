import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import authUserStore from '../../state/stores/authUserStore'
import JobCard from '../../components/cards/jobCard'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../../params/screens'

const HomeScreen = () => {
    const { jobsCreated, jobsWorked } = authUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>Home</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Chats')}
                    >
                        <MaterialCommunityIcons
                            name="android-messages"
                            size={35}
                            color={themeColors.AVACADO}
                        />
                    </TouchableOpacity>
                </View>
                {jobsWorked.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            Jobs that you work on will be shown here.
                        </Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.subHeading}>Jobs</Text>
                        {jobsCreated.map((job) => (
                            <JobCard
                                key={job.jobId}
                                nav={navigation}
                                jobId={job.jobId}
                                jobName={job.jobName}
                                status={job.status}
                                payment={job.payment}
                                jobDesc={job.description}
                                deadline={job.dueDate}
                            />
                        ))}
                    </>
                )}
                {jobsCreated.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            Jobs that you create will be shown here.
                        </Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.subHeading}>Jobs</Text>
                        {jobsCreated.map((job) => (
                            <JobCard
                                key={job.jobId}
                                nav={navigation}
                                jobId={job.jobId}
                                jobName={job.jobName}
                                status={job.status}
                                payment={job.payment}
                                jobDesc={job.description}
                                deadline={job.dueDate}
                            />
                        ))}
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
        justifyContent: 'space-between',
        paddingTop: '20%',
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.PLATINUM,
    },
    subHeading: {
        alignSelf: 'flex-start',
        paddingLeft: 30,
        paddingTop: 20,
        marginBottom: 20,
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.PLATINUM,
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.PLATINUM,
        paddingTop: '10%',
        textAlign: 'center',
    },
})

export default HomeScreen
