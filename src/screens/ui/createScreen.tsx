import { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const CreateScreen = () => {
    const [switchColumn, setSwitchColumn] = useState<'Project' | 'Job'>(
        'Project'
    )

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left-circle"
                            size={30}
                            color={themeColors.YELLOW_GREEN}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Create</Text>
                </View>
                <View style={styles.buttonSection}>
                    <TouchableOpacity
                        onPress={() => setSwitchColumn('Project')}
                    >
                        <Text
                            style={{
                                ...styles.button,
                                color:
                                    switchColumn === 'Project'
                                        ? themeColors.YELLOW_GREEN
                                        : themeColors.SILVER,
                            }}
                        >
                            Project
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSwitchColumn('Job')}>
                        <Text
                            style={{
                                ...styles.button,
                                color:
                                    switchColumn === 'Job'
                                        ? themeColors.YELLOW_GREEN
                                        : themeColors.SILVER,
                            }}
                        >
                            Job
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoSection}>
                    {switchColumn === 'Project' ? (
                        <>
                            <View style={styles.infoTextWrapper}>
                                <MaterialCommunityIcons
                                    name="briefcase-account"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                />
                                <Text style={styles.infoText}>
                                    Create multiple jobs and hire others to
                                    achieve your project's goal.
                                </Text>
                            </View>
                            <View style={styles.infoTextWrapper}>
                                <MaterialCommunityIcons
                                    name="account-group"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                />
                                <Text style={styles.infoText}>
                                    Collaborate with your team and track your
                                    project's progress.
                                </Text>
                            </View>
                            <View style={styles.infoTextWrapper}>
                                <MaterialCommunityIcons
                                    name="account-cash"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                />
                                <Text style={styles.infoText}>
                                    Make job payments and manage your project's
                                    hiring budget.
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.mainButtonWrapper}>
                                <Text
                                    onPress={() => {}}
                                    style={styles.mainButton}
                                >
                                    Create Project
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <View style={styles.infoTextWrapper}>
                                <MaterialCommunityIcons
                                    name="account-cowboy-hat"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                />
                                <Text style={styles.infoText}>
                                    Create a job and hire someone to work on it.
                                </Text>
                            </View>
                            <View style={styles.infoTextWrapper}>
                                <MaterialCommunityIcons
                                    name="cash-fast"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                />
                                <Text style={styles.infoText}>
                                    Make the job payment and any further
                                    payments.
                                </Text>
                            </View>
                            <View style={styles.infoTextWrapper}>
                                <MaterialCommunityIcons
                                    name="credit-card-check"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                />
                                <Text style={styles.infoText}>
                                    Each payment costs a $10 transaction fee.
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.mainButtonWrapper}>
                                <Text
                                    onPress={() => {}}
                                    style={styles.mainButton}
                                >
                                    Create Job
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
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
        alignItems: 'center',
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
    buttonSection: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between',
        paddingTop: '5%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
    },
    infoSection: {
        alignItems: 'flex-start',
    },
    infoTextWrapper: {
        flexDirection: 'row',
        paddingTop: '5%',
        alignItems: 'center',
        width: '80%',
    },
    infoText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingLeft: '10%',
    },
    mainButtonWrapper: { alignSelf: 'center' },
    mainButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
        paddingTop: '10%',
        paddingBottom: '20%',
    },
})

export default CreateScreen
