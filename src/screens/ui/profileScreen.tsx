import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import authUserStore from '../../state/stores/authUserStore'
import { FontAwesome5 } from '@expo/vector-icons'
import UserCard from '../../components/cards/userCard'
import JobCard from '../../components/cards/jobCard'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../../params/screens'

const ProfileScreen = () => {
    const { account, profile, jobsCreated, jobsWorked } = authUserStore(
        (state) => state
    )

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>Profile</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Feedback')}
                    >
                        <FontAwesome5
                            name="grin-stars"
                            size={30}
                            color={themeColors.AVACADO}
                        />
                    </TouchableOpacity>
                </View>
                <UserCard
                    first={account.firstName}
                    last={account.lastName}
                    image={profile.profilePicture}
                    jobsCreated={jobsCreated.length.toString()}
                    jobsWorked={jobsWorked.length.toString()}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddProject')}
                >
                    <Text style={styles.button}>Add Job</Text>
                </TouchableOpacity>
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
        justifyContent: 'space-between',
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
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.AVACADO,
        paddingTop: '10%',
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

export default ProfileScreen
