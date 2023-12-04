import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import projectScreenProps from '../props/projectScreenProps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import jobCardProps from '../../components/props/jobCardProps'
import categories from '../../enums/categories'
import jobStatus from '../../enums/jobStatus'
import JobCard from '../../components/cards/jobCard'
import selection from '../../enums/selection'

const ProjectScreen = ({ route }: projectScreenProps) => {
    const { projectId } = route.params

    const [_projectId, setProjectId] = useState<string>('123')
    const [projectName, setProjectName] = useState<string>(
        'A very very very very very very very long project name'
    )
    const [projectCreatorId, setProjectCreatorId] = useState<string>('456')
    const [projectCreator, setProjectCreator] = useState<string>(
        'A very very very very very very very long project creator name'
    )
    const [category, setCategory] = useState<string>('Category Name')
    const [creationDate, setCreationDate] = useState<string>('2021-01-01')
    const [projectDesc, setProjectDesc] = useState<string>(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.'
    )
    const [loading, setLoading] = useState<boolean>(false)
    const currentUser = 'First Last'

    const navigation: NavigationProp<screens> = useNavigation()

    const jobs: Array<jobCardProps> = [
        {
            jobId: '1',
            jobName: 'Created Job 1',
            status: jobStatus.AVAILABLE,
            payment: '100000',
            description:
                'Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            creationDate: '2021-01-01',
            category: categories.ACCOUNTING,
            showPlus: selection.NONE,
        },
        {
            jobId: '2',
            jobName: 'Created Job 2',
            status: jobStatus.IN_PROGRESS,
            payment: '200',
            description: 'This is a description for Created job 2',
            creationDate: '2021-01-01',
            category: categories.ADVERTISING,
            showPlus: selection.NONE,
        },
        {
            jobId: '3',
            jobName: 'Created Job 3',
            status: jobStatus.COMPLETED,
            payment: '200',
            description: 'This is a description for Created job 3',
            creationDate: '2021-01-01',
            category: categories.ANIMATION,
            showPlus: selection.NONE,
        },
    ]

    useEffect(() => {}, [projectId])

    return (
        <View style={styles.container}>
            {loading === false ? (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.headerSection}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                                name="chevron-left-circle"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Project</Text>
                    </View>
                    <Text style={styles.detail}>{projectName}</Text>
                    <Text style={styles.detail}>{creationDate}</Text>
                    <View style={styles.detailSection}>
                        <Text style={styles.projectDetail}>{category}</Text>
                    </View>
                    <Text style={styles.projectDesc}>{projectDesc}</Text>
                    {projectCreator === `${currentUser}` ? null : (
                        <>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('User', {
                                        userId: projectCreatorId,
                                    })
                                }
                            >
                                <Text style={styles.infoButton}>
                                    {projectCreator}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                    <View style={styles.jobList}>
                        {jobs.length !== 0 ? (
                            <>
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
                                            marginBottom: '5%',
                                        }}
                                    />
                                ))}
                            </>
                        ) : null}
                    </View>
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
        flexGrow: 1,
        alignItems: 'flex-start',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: '10%',
        paddingRight: '10%',
        width: '100%',
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
        paddingLeft: '5%',
    },
    detail: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingHorizontal: '10%',
        paddingTop: '5%',
    },
    detailSection: {
        flexDirection: 'row',
        marginLeft: '10%',
        marginTop: '5%',
    },
    projectDetail: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.YELLOW_GREEN,
        padding: '1%',
        marginRight: '5%',
    },
    infoButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.YELLOW_GREEN,
        marginHorizontal: '10%',
        marginTop: '5%',
    },
    projectDesc: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        width: '80%',
        alignSelf: 'center',
        paddingTop: '5%',
    },
    jobList: {
        width: '100%',
        paddingBottom: '20%',
        paddingTop: '5%',
        alignItems: 'center',
    },
})

export default ProjectScreen
