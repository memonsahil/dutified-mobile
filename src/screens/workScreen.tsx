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
import useAuthUserStore from '../stores/useAuthUserStore'
import useJobStore from '../stores/useJobStore'
import WorkSetupCard from '../components/workSetupCard'
import JobCard from '../components/jobCard'
import * as Progress from 'react-native-progress'
import { FontAwesome } from '@expo/vector-icons'
import jobState from '../interfaces/state/jobState'
import { blue, green, white } from '../theme/colors'
import screens from '../types/params/screens'

const WorkScreen = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [preferredJobs, setPreferredJobs] = useState<jobState[]>([])
    const [showResults, setShowResults] = useState<boolean>(false)

    const { workSetup } = useAuthUserStore((state) => state)
    const { findPreferredJobs } = useJobStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        setShowResults(false)
    }, [workSetup])

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>Work</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Search')}
                    >
                        <FontAwesome name="search" size={30} color={green} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.subHeading}>Work Setup</Text>
                <WorkSetupCard
                    nav={navigation}
                    preferredCategories={workSetup.preferredCategories}
                    totalJobs={workSetup.totalJobs}
                />
                {workSetup.preferredCategories.length !== 0 &&
                workSetup.totalJobs !== '' ? (
                    <TouchableOpacity
                        style={styles.viewButtonContainer}
                        onPress={() => {
                            setLoading(true)

                            findPreferredJobs({
                                preferredCategories:
                                    workSetup.preferredCategories,
                                totalJobs: workSetup.totalJobs,
                            })
                                .then((result) => {
                                    setPreferredJobs(result.data!)

                                    setShowResults(true)
                                    setLoading(false)
                                })
                                .catch(() => {
                                    setLoading(false)

                                    Alert.alert(
                                        'Error Occurred',
                                        'An error occurred, please try again or contact our support team.',
                                        [
                                            {
                                                text: 'Dismiss',
                                                onPress: () => {},
                                            },
                                        ]
                                    )
                                })
                        }}
                    >
                        <Text style={styles.viewButton}>FIND JOBS</Text>
                    </TouchableOpacity>
                ) : null}
                {loading === false ? (
                    showResults === true ? (
                        preferredJobs.length !== 0 ? (
                            <>
                                <View style={styles.topSpacer} />
                                {preferredJobs.map((job) => (
                                    <JobCard
                                        key={job.jobId}
                                        nav={navigation}
                                        jobId={job.jobId}
                                        jobName={job.jobName}
                                        status={job.status}
                                        payment={job.payment}
                                        jobDesc={job.jobDesc}
                                        deadline={job.deadline}
                                    />
                                ))}
                            </>
                        ) : (
                            <Text style={styles.noDataText}>
                                No jobs were found, try updating your work
                                preferences.
                            </Text>
                        )
                    ) : null
                ) : (
                    <View style={styles.loadingContainer}>
                        <Progress.Bar
                            width={250}
                            height={25}
                            borderRadius={20}
                            indeterminate={true}
                            color={green}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blue,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '25%',
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
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 40,
        color: white,
    },
    subHeading: {
        alignSelf: 'flex-start',
        paddingLeft: 30,
        paddingTop: 20,
        marginBottom: 20,
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 30,
        color: white,
    },
    viewButtonContainer: {
        paddingTop: '10%',
    },
    viewButton: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 25,
        color: green,
    },
    noDataText: {
        fontFamily: 'IBMPlexSans-Regular',
        fontSize: 18,
        color: white,
        paddingTop: '5%',
        paddingLeft: 30,
        paddingRight: 30,
    },
    topSpacer: {
        paddingBottom: '10%',
    },
})

export default WorkScreen
