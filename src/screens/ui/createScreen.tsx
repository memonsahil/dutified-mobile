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
                            <Text style={styles.infoText}>
                                Create a new project and add multiple jobs:
                            </Text>
                            <Text style={styles.infoText}>
                                Break down your project goal into multiple jobs
                                and build your team to work on it.
                            </Text>
                            <Text style={styles.infoText}>
                                Collaborate with others, track your project's
                                progress and manage your hiring budget.
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.infoText}>
                            Create a new job and hire a user:
                        </Text>
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
        paddingBottom: '5%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
    },
    infoSection: {
        paddingBottom: '20%',
        width: '80%',
    },
    infoText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
    },
})

export default CreateScreen
