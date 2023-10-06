import { useState } from 'react'
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
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'

const SettingsScreen = () => {
    const [switchColumn, setSwitchColumn] = useState<
        'Profile' | 'Payments' | 'Account'
    >('Profile')
    const [loading, setLoading] = useState<boolean>(false)

    const { removeAuthUser } = authUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            {loading === false ? (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.headerSection}>
                        <Text style={styles.heading}>Settings</Text>
                    </View>
                    <View style={styles.buttonSection}>
                        <TouchableOpacity
                            onPress={() => setSwitchColumn('Profile')}
                        >
                            <Text
                                style={{
                                    ...styles.switchbutton,
                                    color:
                                        switchColumn === 'Profile'
                                            ? themeColors.YELLOW_GREEN
                                            : themeColors.SILVER,
                                }}
                            >
                                Profile
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSwitchColumn('Payments')}
                        >
                            <Text
                                style={{
                                    ...styles.switchbutton,
                                    color:
                                        switchColumn === 'Payments'
                                            ? themeColors.YELLOW_GREEN
                                            : themeColors.SILVER,
                                }}
                            >
                                Payments
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSwitchColumn('Account')}
                        >
                            <Text
                                style={{
                                    ...styles.switchbutton,
                                    color:
                                        switchColumn === 'Account'
                                            ? themeColors.YELLOW_GREEN
                                            : themeColors.SILVER,
                                }}
                            >
                                Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {switchColumn === 'Profile' ? (
                        <>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={styles.button}>Edit Name</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditProfilePicture')
                                }
                            >
                                <Text style={styles.button}>
                                    Edit Profile Picture
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={styles.button}>Edit Bio</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={styles.button}>
                                    Edit Daily Rate
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={styles.button}>
                                    Edit Interests
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={styles.button}>Edit Links</Text>
                            </TouchableOpacity>
                        </>
                    ) : null}
                    {switchColumn === 'Payments' ? (
                        <>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={styles.button}>
                                    Edit Payment Details
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}}>
                                <Text style={styles.button}>Transactions</Text>
                            </TouchableOpacity>
                        </>
                    ) : null}
                    {switchColumn === 'Account' ? (
                        <>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditPhoneNumber')
                                }
                            >
                                <Text style={styles.button}>
                                    Edit Phone Number
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditEmailAddress')
                                }
                            >
                                <Text style={styles.button}>
                                    Edit Email Address
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditPassword')
                                }
                            >
                                <Text style={styles.button}>Edit Password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Support')}
                            >
                                <Text style={styles.button}>Support</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setLoading(true)
                                }}
                            >
                                <Text style={styles.button}>Sign Out</Text>
                            </TouchableOpacity>
                        </>
                    ) : null}
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
        alignItems: 'flex-start',
        paddingBottom: '20%',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: '10%',
        paddingRight: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
    },
    buttonSection: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
        paddingTop: '5%',
        alignSelf: 'center',
    },
    switchbutton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
        paddingTop: '5%',
        paddingLeft: '10%',
    },
})

export default SettingsScreen
