import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import useProjectStore from '../stores/useProjectStore'
import useJobStore from '../stores/useJobStore'
import * as Progress from 'react-native-progress'
import ProjectCard from '../components/projectCard'
import JobCard from '../components/jobCard'
import { AntDesign } from '@expo/vector-icons'
import {
    oxfordBlue,
    silver,
    yellowGreen,
    antiFlashWhite,
} from '../theme/colors'
import projectState from '../interfaces/state/projectState'
import jobState from '../interfaces/state/jobState'
import jobStatus from '../enums/jobStatus'
import screens from '../types/params/screens'

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('')
    const [projects, setProjects] = useState<projectState[]>([])
    const [jobs, setJobs] = useState<jobState[]>([])
    const [loading, setLoading] = useState(false)

    const { getProjectResults } = useProjectStore((state) => state)
    const { getJobResults } = useJobStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        if (searchText !== '') {
            setLoading(true)

            Promise.all([
                getProjectResults(searchText),
                getJobResults(searchText),
            ])
                .then((results) => {
                    setProjects(results[0].data!)
                    setJobs(results[1].data!)

                    setLoading(false)
                })
                .catch(() => {
                    Alert.alert(
                        'Error Occurred',
                        'An error occurred, please try again or contact our support team.',
                        [
                            {
                                text: 'Dismiss',
                                onPress: () => {
                                    navigation.goBack()
                                },
                            },
                        ]
                    )
                })
        }
    }, [searchText])

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign
                            name="caretleft"
                            size={30}
                            color={yellowGreen}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Search</Text>
                </View>
                <TextInput
                    placeholder="App Development"
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.textInput}
                    placeholderTextColor={silver}
                    inputMode="text"
                />
                {searchText === '' ? (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            Search for projects and jobs by their name or
                            category.
                        </Text>
                    </View>
                ) : (
                    <>
                        {loading !== true ? (
                            <>
                                {projects.length === 0 && jobs.length === 0 ? (
                                    <View style={styles.noDataContainer}>
                                        <Text style={styles.noDataHeading}>
                                            No Results Found
                                        </Text>
                                        <Text style={styles.noDataText}>
                                            No projects or jobs were found, try
                                            searching for something else.
                                        </Text>
                                    </View>
                                ) : null}
                                {projects.length === 0 ? null : (
                                    <>
                                        <Text style={styles.subHeading}>
                                            Projects
                                        </Text>
                                        <ScrollView
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={
                                                false
                                            }
                                            contentContainerStyle={
                                                styles.horizontalSection
                                            }
                                        >
                                            {projects.map((project) => (
                                                <ProjectCard
                                                    key={project.projectId}
                                                    nav={navigation}
                                                    projectId={
                                                        project.projectId
                                                    }
                                                    projectName={
                                                        project.projectName
                                                    }
                                                    category={project.category}
                                                    projectDesc={
                                                        project.projectDesc
                                                    }
                                                    projectCreator={
                                                        project.projectCreator
                                                    }
                                                    availableJobs={
                                                        jobs.filter(
                                                            (job) =>
                                                                job.projectId ===
                                                                    project.projectId &&
                                                                job.status ===
                                                                    jobStatus.AVAILABLE
                                                        ).length
                                                    }
                                                    takenJobs={
                                                        jobs.filter(
                                                            (job) =>
                                                                job.projectId ===
                                                                    project.projectId &&
                                                                job.status ===
                                                                    jobStatus.TAKEN
                                                        ).length
                                                    }
                                                />
                                            ))}
                                        </ScrollView>
                                    </>
                                )}
                                {jobs.length === 0 ? null : (
                                    <>
                                        <Text style={styles.subHeading}>
                                            Jobs
                                        </Text>
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
                                <View style={styles.bottomSpacer} />
                            </>
                        ) : (
                            <View style={styles.loadingContainer}>
                                <Progress.Bar
                                    width={250}
                                    height={25}
                                    borderRadius={20}
                                    indeterminate={true}
                                    color={yellowGreen}
                                />
                            </View>
                        )}
                    </>
                )}
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: oxfordBlue,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50%',
    },
    scrollView: {
        alignItems: 'center',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 30,
        color: antiFlashWhite,
        paddingLeft: 20,
        paddingRight: 30,
    },
    textInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 20,
        color: antiFlashWhite,
        width: '80%',
        paddingTop: '5%',
        borderBottomColor: antiFlashWhite,
        borderBottomWidth: 2,
        alignSelf: 'center',
    },
    subHeading: {
        alignSelf: 'flex-start',
        paddingLeft: 30,
        paddingTop: 20,
        marginBottom: 20,
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 30,
        color: antiFlashWhite,
    },
    horizontalSection: {
        paddingRight: 25,
    },
    bottomSpacer: {
        paddingBottom: '20%',
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
        paddingTop: 20,
    },
    noDataHeading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 30,
        color: antiFlashWhite,
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 18,
        color: antiFlashWhite,
        paddingTop: '5%',
    },
})

export default SearchScreen
