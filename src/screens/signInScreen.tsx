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
import useAuthUserStore from '../stores/useAuthUserStore'
import * as Progress from 'react-native-progress'
import { AntDesign } from '@expo/vector-icons'
import { blue, gray, green, white } from '../theme/colors'
import screens from '../types/params/screens'
import requestStatus from '../enums/requestStatus'

const SignInScreen = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { signIn } = useAuthUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            {loading === false ? (
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
                                color={green}
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
                            placeholderTextColor={gray}
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
                            placeholderTextColor={gray}
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

                                signIn({
                                    emailAddress: email,
                                    accPassword: password,
                                })
                                    .then(() => {
                                        setLoading(false)
                                    })
                                    .catch((error) => {
                                        setLoading(false)

                                        if (
                                            error.status ===
                                                requestStatus.ERROR &&
                                            error.errorCode ===
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
                                            error.status ===
                                                requestStatus.ERROR &&
                                            error.errorCode ===
                                                'auth/wrong-password'
                                        ) {
                                            Alert.alert(
                                                'Invalid Password',
                                                'Please enter a valid password.',
                                                [
                                                    {
                                                        text: 'Dismiss',
                                                        onPress: () => {},
                                                    },
                                                ]
                                            )
                                        } else if (
                                            error.status ===
                                                requestStatus.ERROR &&
                                            error.errorCode ===
                                                'auth/user-not-found'
                                        ) {
                                            Alert.alert(
                                                'Invalid Account',
                                                'An account does not exist with these details.',
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
                                                'An error occurred, please try again or contact our support team.',
                                                [
                                                    {
                                                        text: 'Dismiss',
                                                        onPress: () => {},
                                                    },
                                                ]
                                            )
                                        }
                                    })
                            } else {
                                Alert.alert(
                                    'Missing Details',
                                    'Please enter all of your details before logging in.',
                                    [
                                        {
                                            text: 'Dismiss',
                                            onPress: () => {},
                                        },
                                    ]
                                )
                            }
                        }}
                    >
                        <Text style={styles.button}>Login</Text>
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
                        color={green}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blue,
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
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 30,
        color: white,
        paddingLeft: 20,
        paddingRight: 30,
    },
    signInSection: {
        width: '80%',
        justifyContent: 'space-between',
    },
    field: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 25,
        paddingTop: '10%',
        color: white,
    },
    input: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        color: white,
        width: '100%',
        paddingTop: '5%',
        borderBottomColor: white,
        borderBottomWidth: 2,
        alignSelf: 'center',
    },
    button: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 25,
        color: green,
        alignSelf: 'center',
        paddingTop: '10%',
    },
    textSection: {
        width: '70%',
        textAlign: 'center',
        paddingTop: '5%',
        paddingBottom: '20%',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: white,
        textDecorationLine: 'underline',
    },
})

export default SignInScreen
