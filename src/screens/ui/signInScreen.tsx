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
import promiseType from '../../data/types/promiseType'
import authStore from '../../state/stores/authStore'
import user from '../../data/classes/user'

const SignInScreen = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { setCurrentUser } = authStore((state) => state)

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
                                size={28}
                                color={themeColors.GREEN}
                            />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Sign In</Text>
                    </View>
                    <View style={styles.signInSection}>
                        <Text style={styles.field}>Email</Text>
                        <TextInput
                            placeholder="email@domain.com"
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
                            if (email !== '' && password !== '') {
                                setLoading(true)
                                authUser
                                    .signIn({
                                        emailAddress: email,
                                        password: password,
                                    })
                                    .then((response: promiseType) => {
                                        if (
                                            response.status ===
                                            requestStatus.SUCCESS
                                        ) {
                                            user.getUser({
                                                userId: response.data,
                                            }).then((response: promiseType) => {
                                                if (
                                                    response.status ===
                                                    requestStatus.SUCCESS
                                                ) {
                                                    setCurrentUser(
                                                        response.data
                                                    )
                                                    setLoading(false)
                                                } else {
                                                    setLoading(false)
                                                    Alert.alert(
                                                        'Error Occurred',
                                                        'Please contact our support team.',
                                                        [
                                                            {
                                                                text: 'Dismiss',
                                                                onPress:
                                                                    () => {},
                                                            },
                                                        ]
                                                    )
                                                }
                                            })
                                        } else {
                                            if (
                                                response.status ===
                                                    requestStatus.ERROR &&
                                                response.errorCode ===
                                                    'auth/invalid-email'
                                            ) {
                                                setLoading(false)
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
                                                    'auth/invalid-credential'
                                            ) {
                                                setLoading(false)
                                                Alert.alert(
                                                    'Invalid Details',
                                                    'Please check your credential again.',
                                                    [
                                                        {
                                                            text: 'Dismiss',
                                                            onPress: () => {},
                                                        },
                                                    ]
                                                )
                                            } else {
                                                setLoading(false)
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
                                    'Please enter your credential before signing in.',
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
                            name="login"
                            size={28}
                            color={themeColors.GREEN}
                            style={styles.iconButton}
                        />
                        <Text style={styles.button}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Reset')}
                    >
                        <Text style={styles.textSection}>Forgot Password?</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={themeColors.GREEN}
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
    signInSection: {
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
        color: themeColors.GREEN,
        alignSelf: 'center',
    },
    textSection: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_THREE,
        paddingTop: '10%',
        color: themeColors.WHITE,
        textDecorationLine: 'underline',
    },
})

export default SignInScreen
