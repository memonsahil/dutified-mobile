import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import AuthUser from '../data/authUser'
import useAuthStore from '../stores/useAuthUserStore'
import * as Progress from 'react-native-progress'
import { AntDesign } from '@expo/vector-icons'
import { raisinBlack, silver, yellowGreen, platinum } from '../theme/colors'
import screens from '../types/params/screens'

const EditPhoneNumberScreen = () => {
    const [code, setCode] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { userDetails, updatePhone } = useAuthStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        setCode(userDetails.countryCode)
        setPhone(userDetails.phoneNumber)
    }, [userDetails.countryCode, userDetails.phoneNumber])

    return (
        <View style={styles.container}>
            {loading === false ? (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        contentContainerStyle={styles.scrollView}
                    >
                        <View style={styles.headerSection}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <AntDesign
                                    name="caretleft"
                                    size={30}
                                    color={yellowGreen}
                                />
                            </TouchableOpacity>
                            <Text style={styles.heading}>Phone Number</Text>
                        </View>
                        <Text style={styles.field}>Update Phone</Text>
                        <View style={styles.phoneInputWrapper}>
                            <Text style={styles.codePlus}>+</Text>
                            <TextInput
                                placeholder="000"
                                value={code}
                                onChangeText={setCode}
                                style={styles.codeInput}
                                placeholderTextColor={silver}
                                inputMode="tel"
                            />
                            <TextInput
                                placeholder="123456789"
                                value={phone}
                                onChangeText={setPhone}
                                style={styles.phoneInput}
                                placeholderTextColor={silver}
                                inputMode="tel"
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.saveButtonContainer}
                            onPress={() => {
                                if (code !== '' && phone !== '') {
                                    setLoading(true)
                                    AuthUser.setPhone({
                                        phoneNumber: phone,
                                        countryCode: code,
                                    })
                                        .then(() => {
                                            updatePhone({
                                                phoneNumber: phone,
                                                countryCode: code,
                                            })

                                            setLoading(false)

                                            navigation.goBack()
                                        })
                                        .catch(() => {
                                            Alert.alert(
                                                'Error Occurred',
                                                'An error occurred, please try again or contact our support team.',
                                                [
                                                    {
                                                        text: 'Dismiss',
                                                        onPress: () => {
                                                            navigation.goBack()
                                                        },
                                                    },
                                                ]
                                            )
                                        })
                                } else {
                                    Alert.alert(
                                        'Missing Details',
                                        'Please enter country code and phone number before updating it.',
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
                            <Text style={styles.saveButton}>Save</Text>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>
                </TouchableWithoutFeedback>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={yellowGreen}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: raisinBlack,
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
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 30,
        color: platinum,
        paddingLeft: 20,
        paddingRight: 30,
    },
    field: {
        alignSelf: 'flex-start',
        paddingLeft: 40,
        paddingTop: '7%',
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 25,
        color: platinum,
    },
    phoneInputWrapper: {
        flexDirection: 'row',
        width: '80%',
    },
    codePlus: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 20,
        color: platinum,
        width: '10%',
        paddingTop: '5%',
        textAlignVertical: 'center',
    },
    codeInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 20,
        color: platinum,
        width: '15%',
        marginRight: '5%',
        paddingTop: '5%',
        borderBottomColor: platinum,
        borderBottomWidth: 2,
        textAlignVertical: 'center',
    },
    phoneInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 20,
        color: platinum,
        width: '70%',
        paddingTop: '5%',
        borderBottomColor: platinum,
        borderBottomWidth: 2,
        textAlignVertical: 'center',
    },
    saveButtonContainer: {
        paddingTop: '10%',
    },
    saveButton: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 25,
        color: yellowGreen,
    },
})

export default EditPhoneNumberScreen
