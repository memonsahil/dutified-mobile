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
import jobScreenProps from '../props/jobScreenProps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import jobStatus from '../../enums/jobStatus'

const JobScreen = ({ route }: jobScreenProps) => {
    const { jobId } = route.params

    const [jobName, setJobName] = useState<string>(
        'A very very very very very very very long job name'
    )
    const [category, setCategory] = useState<string>('Category Name')
    const [payment, setPayment] = useState<string>('200')
    const [status, setStatus] = useState<jobStatus>(jobStatus.AVAILABLE)
    const [creationDate, setCreationDate] = useState<string>('2021-01-01')
    const [dueDate, setDueDate] = useState<string>('2021-01-01')
    const [jobDesc, setJobDesc] = useState<string>(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.'
    )
    const [projectId, setProjectId] = useState<string>('123')
    const [projectName, setProjectName] = useState<string>(
        'A very very very very very very  long project name'
    )
    const [jobCreatorId, setJobCreatorId] = useState<string>('456')
    const [jobCreator, setJobCreator] = useState<string>(
        'A very very very very very very very long project creator name'
    )
    const [loading, setLoading] = useState<boolean>(false)
    const currentUser = 'First Last'

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {}, [jobId])

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
                        <Text style={styles.heading}>Job</Text>
                    </View>
                    <Text style={styles.detail}>{jobName}</Text>
                    <Text style={styles.detail}>{creationDate}</Text>
                    <View style={styles.detailSection}>
                        <Text style={styles.jobDetail}>{category}</Text>
                    </View>
                    <View style={styles.detailSection}>
                        <Text style={styles.jobDetail}>${payment}</Text>
                        <Text style={styles.jobDetail}>{status}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Project', {
                                projectId: projectId,
                            })
                        }
                    >
                        <Text style={styles.infoButton}>{projectName}</Text>
                    </TouchableOpacity>
                    <Text style={styles.jobDesc}>{jobDesc}</Text>
                    {jobCreator === `${currentUser}` ? null : (
                        <>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('User', {
                                        userId: jobCreatorId,
                                    })
                                }
                            >
                                <Text style={styles.infoButton}>
                                    {jobCreator}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Chat', {
                                        userId: jobCreatorId,
                                    })
                                }
                                style={styles.buttonSection}
                            >
                                <Text style={styles.chatButton}>Chat</Text>
                            </TouchableOpacity>
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
    jobDetail: {
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
    jobDesc: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        width: '80%',
        alignSelf: 'center',
        paddingTop: '5%',
    },
    buttonSection: {
        alignSelf: 'center',
        paddingTop: '10%',
    },
    chatButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
    },
})

export default JobScreen
