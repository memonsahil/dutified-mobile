import { useState } from 'react'
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
import { MaterialCommunityIcons } from '@expo/vector-icons'

const SettingsScreen = () => {
    const [switchColumn, setSwitchColumn] = useState<
        'Profile' | 'Payments' | 'Account'
    >('Profile')
    const [loading, setLoading] = useState<boolean>(false)

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
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditProfilePicture')
                                }
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="account-circle"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>
                                    Profile Picture
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditBio')}
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="card-text"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>Bio</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditRate')}
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="account-cash"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>Rate/Day</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditInterests')
                                }
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="account-details"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>Interests</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditLinks')}
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="link"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>Links</Text>
                            </TouchableOpacity>
                        </>
                    ) : null}
                    {switchColumn === 'Payments' ? (
                        <>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditPayment')
                                }
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="credit-card-edit"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>
                                    Payment Details
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Transactions')
                                }
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="credit-card-fast"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
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
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="cellphone"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>Phone Number</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditEmailAddress')
                                }
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="email"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>Email Address</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('EditPassword')
                                }
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="form-textbox-password"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>Password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Support')}
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="help-circle"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>Support</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setLoading(true)
                                }}
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="logout"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
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
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '10%',
    },
    iconButton: {
        marginRight: '3%',
        paddingLeft: '10%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
    },
})

export default SettingsScreen
