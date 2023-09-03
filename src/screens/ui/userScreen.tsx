import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Alert,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'

import * as Progress from 'react-native-progress'
import UserCard from '../../components/cards/userCard'
import JobCard from '../../components/cards/jobCard'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import userScreenProps from '../props/userScreenProps'

const UserScreen = ({ route }: userScreenProps) => {
    const { userId } = route.params

    const [first, setFirst] = useState<string>('')
    const [last, setLast] = useState<string>('')
    const [imageSrc, setImageSrc] = useState<string>('')
    const [projects, setProjects] = useState<
        {
            projectId: string
            projectName: string
            projectCreatorId: string
            projectCreator: string
            category: string
            projectDesc: string
        }[]
    >([])
    const [jobs, setJobs] = useState<
        {
            jobId: string
            jobName: string
            projectId: string
            projectName: string
            jobCreatorId: string
            jobCreator: string
            jobWorkerId: string
            jobWorker: string
            payment: string
            status: string
            deadline: string
            jobDesc: string
        }[]
    >([])
    const [loading, setLoading] = useState<boolean>(true)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {}, [userId])

    return (
        <View style={styles.container}>
            {loading === false ? (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.headerSection}>
                        <View style={styles.headingRegion}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <AntDesign
                                    name="caretleft"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                />
                            </TouchableOpacity>
                            <Text style={styles.heading}>Profile</Text>
                        </View>
                        <FontAwesome5
                            name="grin-stars"
                            size={30}
                            color={themeColors.YELLOW_GREEN}
                        />
                    </View>
                    {/*
                        <UserCard
                        first={account.firstName}
                        last={account.lastName}
                        image={profile.profilePicture}
                        jobsCreated={jobsCreated.length.toString()}
                        jobsWorked={jobsWorked.length.toString()}
                    />
                        */}
                    {jobs.length !== 0 ? (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>
                                {`${first} ${last} has not created or worked on any jobs yet.`}
                            </Text>
                        </View>
                    ) : (
                        <>
                            <Text style={styles.subHeading}>Jobs</Text>
                            {jobs.map((job) => (
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
                    )}
                </ScrollView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={themeColors.YELLOW_GREEN}
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
        alignItems: 'center',
        paddingBottom: '20%',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headingRegion: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.WHITE,
        paddingLeft: 20,
    },
    subHeading: {
        alignSelf: 'flex-start',
        paddingLeft: 30,
        paddingTop: 20,
        marginBottom: 20,
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.WHITE,
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
        textAlign: 'center',
    },
})

export default UserScreen
