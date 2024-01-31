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
import * as Progress from 'react-native-progress'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import authUser from '../../data/classes/authUser'
import promiseType from '../../data/types/promiseType'
import requestStatus from '../../enums/requestStatus'
import authStore from '../../state/stores/authStore'

const EditPaymentScreen = () => {
    const [cardNumber, setCardNumber] = useState<string>('')
    const [securityCode, setSecurityCode] = useState<string>('')
    const [expiryMonth, setExpiryMonth] = useState<string>('')
    const [expiryYear, setExpiryYear] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { currentUser, setCurrentUser } = authStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        currentUser?.paymentDetails &&
        JSON.stringify(currentUser?.paymentDetails) !==
            JSON.stringify({
                cardNumber: cardNumber,
                securityCode: securityCode,
                expiryMonth: expiryMonth,
                expiryYear: expiryYear,
            })
            ? (setCardNumber(currentUser?.paymentDetails.cardNumber),
              setSecurityCode(currentUser?.paymentDetails.securityCode),
              setExpiryMonth(currentUser?.paymentDetails.expiryMonth),
              setExpiryYear(currentUser?.paymentDetails.expiryYear))
            : (setCardNumber(''),
              setSecurityCode(''),
              setExpiryMonth(''),
              setExpiryYear(''))
    }, [currentUser?.paymentDetails])

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
                                <MaterialCommunityIcons
                                    name="chevron-left-circle"
                                    size={26}
                                    color={themeColors.YELLOW_GREEN}
                                />
                            </TouchableOpacity>
                            <Text style={styles.heading}>Payment Details</Text>
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>Card Number</Text>
                            <TextInput
                                placeholder="0000 0000 0000 0000"
                                value={cardNumber}
                                onChangeText={setCardNumber}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                inputMode="numeric"
                            />
                            <Text style={styles.field}>Security Code</Text>
                            <TextInput
                                placeholder="000"
                                value={securityCode}
                                onChangeText={setSecurityCode}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                inputMode="numeric"
                            />
                            <Text style={styles.field}>Expiry Month</Text>
                            <TextInput
                                placeholder="12"
                                value={expiryMonth}
                                onChangeText={setExpiryMonth}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                inputMode="numeric"
                            />
                            <Text style={styles.field}>Expiry Year</Text>
                            <TextInput
                                placeholder="2090"
                                value={expiryYear}
                                onChangeText={setExpiryYear}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                inputMode="numeric"
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.saveButtonContainer}
                            onPress={() => {
                                if (
                                    cardNumber.length === 16 &&
                                    securityCode.length === 3 &&
                                    parseInt(expiryMonth) > 0 &&
                                    parseInt(expiryMonth) < 13 &&
                                    parseInt(expiryYear) >=
                                        new Date().getFullYear()
                                ) {
                                    setLoading(true)
                                    authUser
                                        .setPaymentDetails({
                                            paymentDetails: {
                                                cardNumber: cardNumber,
                                                securityCode: securityCode,
                                                expiryMonth: expiryMonth,
                                                expiryYear: expiryYear,
                                            },
                                        })
                                        .then((response: promiseType) => {
                                            if (
                                                response.status ===
                                                requestStatus.SUCCESS
                                            ) {
                                                currentUser &&
                                                currentUser.paymentDetails
                                                    ? setCurrentUser({
                                                          ...currentUser,
                                                          paymentDetails: {
                                                              cardNumber:
                                                                  cardNumber,
                                                              securityCode:
                                                                  securityCode,
                                                              expiryMonth:
                                                                  expiryMonth,
                                                              expiryYear:
                                                                  expiryYear,
                                                          },
                                                      })
                                                    : null
                                                navigation.goBack()
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
                                        })
                                } else {
                                    Alert.alert(
                                        'Invalid Details',
                                        'Please update your payment details.',
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
                            <MaterialCommunityIcons
                                name="content-save"
                                size={26}
                                color={themeColors.YELLOW_GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.saveButton}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.saveButtonContainer}
                            onPress={() => {
                                setLoading(true)
                                authUser
                                    .setPaymentDetails({
                                        paymentDetails: {
                                            cardNumber: '',
                                            securityCode: '',
                                            expiryMonth: '',
                                            expiryYear: '',
                                        },
                                    })
                                    .then((response: promiseType) => {
                                        if (
                                            response.status ===
                                            requestStatus.SUCCESS
                                        ) {
                                            currentUser &&
                                            currentUser.paymentDetails
                                                ? setCurrentUser({
                                                      ...currentUser,
                                                      paymentDetails: {
                                                          cardNumber: '',
                                                          securityCode: '',
                                                          expiryMonth: '',
                                                          expiryYear: '',
                                                      },
                                                  })
                                                : null
                                            navigation.goBack()
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
                                    })
                            }}
                        >
                            <MaterialCommunityIcons
                                name="square-edit-outline"
                                size={26}
                                color={themeColors.YELLOW_GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.saveButton}>Reset</Text>
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
    mainSection: {
        width: '80%',
    },
    field: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        paddingTop: '10%',
        color: themeColors.WHITE,
        alignSelf: 'flex-start',
    },
    textInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '100%',
        paddingTop: '5%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 3,
        alignSelf: 'center',
    },
    saveButtonContainer: {
        paddingTop: '10%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginRight: '3%',
    },
    saveButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
    },
})

export default EditPaymentScreen
