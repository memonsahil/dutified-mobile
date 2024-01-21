import { useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Alert,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import requestStatus from '../../enums/requestStatus'
import authUser from '../../data/classes/authUser'
import * as Crypto from 'expo-crypto'
import promiseType from '../../data/types/promiseType'
import utilStore from '../../state/stores/utilStore'

const SignUpScreen = () => {
    const [first, setFirst] = useState<string>('')
    const [last, setLast] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { setSignedIn } = utilStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            {loading === false ? (
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    contentContainerStyle={styles.scrollView}
                >
                    <View style={styles.headerSection}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                                name="chevron-left-circle"
                                size={26}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Sign Up</Text>
                    </View>
                    <View style={styles.signUpSection}>
                        <Text style={styles.field}>Name</Text>
                        <TextInput
                            placeholder="First"
                            value={first}
                            onChangeText={setFirst}
                            style={styles.input}
                            placeholderTextColor={themeColors.SILVER}
                            autoCapitalize="words"
                            autoComplete="off"
                            autoCorrect={false}
                        />
                        <TextInput
                            placeholder="Last"
                            value={last}
                            onChangeText={setLast}
                            style={styles.input}
                            placeholderTextColor={themeColors.SILVER}
                            autoCapitalize="words"
                            autoComplete="off"
                            autoCorrect={false}
                        />
                        <Text style={styles.field}>Phone</Text>
                        <View style={styles.phoneInputWrapper}>
                            <Text style={styles.codePlus}>+</Text>
                            <TextInput
                                placeholder="000"
                                value={code}
                                onChangeText={setCode}
                                style={styles.codeInput}
                                placeholderTextColor={themeColors.SILVER}
                                inputMode="tel"
                            />
                            <TextInput
                                placeholder="123456789"
                                value={phone}
                                onChangeText={setPhone}
                                style={styles.phoneInput}
                                placeholderTextColor={themeColors.SILVER}
                                inputMode="tel"
                            />
                        </View>
                        <Text style={styles.field}>Email</Text>
                        <TextInput
                            placeholder="you@domain.com"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholderTextColor={themeColors.SILVER}
                            inputMode="email"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                        />
                        <Text style={styles.field}>Password</Text>
                        <TextInput
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            placeholderTextColor={themeColors.SILVER}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (
                                first !== '' &&
                                last !== '' &&
                                code !== '' &&
                                phone !== '' &&
                                email !== '' &&
                                password != ''
                            ) {
                                setLoading(true)

                                authUser
                                    .signUp({
                                        user: {
                                            userId: Crypto.randomUUID(),
                                            firstName: first,
                                            lastName: last,
                                            countryCode: code,
                                            phoneNumber: phone,
                                            emailAddress: email,
                                            onboarded: false,
                                        },
                                        password: password,
                                    })
                                    .then((response: promiseType) => {
                                        setLoading(false)

                                        if (
                                            response.status ===
                                            requestStatus.SUCCESS
                                        ) {
                                            setSignedIn(true)
                                            navigation.navigate('Onboarding')
                                        } else {
                                            if (
                                                response.status ===
                                                    requestStatus.ERROR &&
                                                response.errorCode ===
                                                    'auth/email-already-in-use'
                                            ) {
                                                Alert.alert(
                                                    'Account Exists',
                                                    'An account already exists with this email address.',
                                                    [
                                                        {
                                                            text: 'Dismiss',
                                                            onPress: () => {},
                                                        },
                                                    ]
                                                )
                                            } else if (
                                                response.status ===
                                                    requestStatus.ERROR &&
                                                response.errorCode ===
                                                    'auth/invalid-email'
                                            ) {
                                                Alert.alert(
                                                    'Invalid Email',
                                                    'Please enter a valid email address.',
                                                    [
                                                        {
                                                            text: 'Dismiss',
                                                            onPress: () => {},
                                                        },
                                                    ]
                                                )
                                            } else if (
                                                response.status ===
                                                    requestStatus.ERROR &&
                                                response.errorCode ===
                                                    'auth/weak-password'
                                            ) {
                                                Alert.alert(
                                                    'Weak Password',
                                                    'Please enter a strong password.',
                                                    [
                                                        {
                                                            text: 'Dismiss',
                                                            onPress: () => {},
                                                        },
                                                    ]
                                                )
                                            } else if (
                                                response.status ===
                                                    requestStatus.ERROR &&
                                                response.errorCode ===
                                                    'auth/operation-not-allowed'
                                            ) {
                                                Alert.alert(
                                                    'Operation Not Allowed',
                                                    'Please contact our support team.',
                                                    [
                                                        {
                                                            text: 'Dismiss',
                                                            onPress: () => {},
                                                        },
                                                    ]
                                                )
                                            } else {
                                                Alert.alert(
                                                    'Error Occurred',
                                                    'Please contact our support team.',
                                                    [
                                                        {
                                                            text: 'Dismiss',
                                                            onPress: () => {},
                                                        },
                                                    ]
                                                )
                                            }
                                        }
                                    })
                            } else {
                                Alert.alert(
                                    'Missing Details',
                                    'Please enter all of your details before signing up.',
                                    [
                                        {
                                            text: 'Dismiss',
                                            onPress: () => {},
                                        },
                                    ]
                                )
                            }
                        }}
                        style={styles.buttonWrapper}
                    >
                        <MaterialCommunityIcons
                            name="account"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                            style={styles.iconButton}
                        />
                        <Text style={styles.button}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TOS')}
                        >
                            <Text style={styles.textButton}>
                                Terms of Service
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('PP')}
                        >
                            <Text style={styles.textButton}>
                                Privacy Policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
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
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    signUpSection: {
        width: '80%',
    },
    field: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        paddingTop: '10%',
        color: themeColors.WHITE,
    },
    input: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '100%',
        paddingTop: '5%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 3,
        alignSelf: 'center',
    },
    phoneInputWrapper: {
        flexDirection: 'row',
        width: '100%',
    },
    codePlus: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '10%',
        paddingTop: '5%',
        textAlignVertical: 'center',
    },
    codeInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '15%',
        marginRight: '5%',
        paddingTop: '5%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 3,
        textAlignVertical: 'center',
    },
    phoneInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '70%',
        paddingTop: '5%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 3,
        textAlignVertical: 'center',
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '10%',
    },
    iconButton: {
        marginRight: '3%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
        alignSelf: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: '20%',
        width: '70%',
    },
    textButton: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_THREE,
        paddingTop: '10%',
        color: themeColors.WHITE,
        textDecorationLine: 'underline',
    },
})

export default SignUpScreen
