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
import authUserStore from '../../state/stores/authUserStore'
import * as Progress from 'react-native-progress'
import { AntDesign } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import jobScreenProps from '../props/jobScreenProps'

const JobScreen = ({ route }: jobScreenProps) => {
    const { jobId } = route.params

    const [jobName, setJobName] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [payment, setPayment] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [jobDesc, setJobDesc] = useState<string>('')
    const [projectId, setProjectId] = useState<string>('')
    const [projectName, setProjectName] = useState<string>('')
    const [jobCreatorId, setJobCreatorId] = useState<string>('')
    const [jobCreator, setJobCreator] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)

    const { account } = authUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {}, [jobId])

    return (
        <View style={styles.container}>
            {loading === false ? (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.headerSection}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign
                                name="caretleft"
                                size={30}
                                color={themeColors.AVACADO}
                            />
                        </TouchableOpacity>
                        <Text
                            style={styles.heading}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {jobName}
                        </Text>
                    </View>
                    <View style={styles.infoSection}>
                        <View>
                            <Text style={styles.info}>{category}</Text>
                        </View>
                        <View style={styles.jobsSection}>
                            <Text style={styles.info}>${payment}</Text>
                            <Text style={styles.info}>{status}</Text>
                        </View>
                    </View>
                    <Text style={styles.deadline}>{deadline}</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('Project', {
                                projectId: projectId,
                            })
                        }
                    >
                        <Text
                            style={styles.button}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {projectName}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.jobDesc}>{jobDesc}</Text>
                    {jobCreator ===
                    `${account.firstName} ${account.lastName}` ? null : (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('User', {
                                    userId: jobCreatorId,
                                })
                            }
                        >
                            <Text
                                style={styles.button}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {jobCreator}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {jobCreator !==
                    `${account.firstName} ${account.lastName}` ? (
                        <View style={styles.buttonSection}>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Chat', {
                                        receiverUserId: jobCreatorId,
                                    })
                                }
                            >
                                <Text style={styles.sectionButton}>Chat</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </ScrollView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={themeColors.AVACADO}
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
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.WHITE,
        paddingLeft: 20,
        paddingRight: 30,
    },
    infoSection: {
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 30,
    },
    info: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.WHITE,
        backgroundColor: themeColors.AVACADO,
        marginRight: 10,
        padding: 5,
    },
    jobsSection: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    jobDesc: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        width: '80%',
        paddingBottom: 20,
        alignSelf: 'center',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.AVACADO,
        paddingLeft: 30,
        paddingRight: 100,
        paddingBottom: 20,
    },
    deadline: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.WHITE,
        paddingLeft: 30,
        paddingRight: 100,
        paddingBottom: 20,
    },
    buttonSection: {
        alignSelf: 'center',
        paddingBottom: '5%',
    },
    sectionButton: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.AVACADO,
    },
})

export default JobScreen
