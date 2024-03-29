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

const EditPhoneNumberScreen = () => {
    const [code, setCode] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { currentUser, setCurrentUser } = authStore((state) => state)

    useEffect(() => {
        currentUser?.profile.countryCode &&
        currentUser?.profile.countryCode !== code
            ? setCode(currentUser?.profile.countryCode)
            : setCode('')
        currentUser?.profile.phoneNumber &&
        currentUser?.profile.phoneNumber !== phone
            ? setPhone(currentUser?.profile.phoneNumber)
            : setPhone('')
    }, [currentUser?.profile.countryCode, currentUser?.profile.phoneNumber])

    const navigation: NavigationProp<screens> = useNavigation()

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
                                    size={28}
                                    color={themeColors.GREEN}
                                />
                            </TouchableOpacity>
                            <Text style={styles.heading}>Phone Number</Text>
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>
                                Update Phone Number
                            </Text>
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
                        </View>
                        <TouchableOpacity
                            style={styles.saveButtonContainer}
                            onPress={() => {
                                if (code !== '' && phone !== '') {
                                    setLoading(true),
                                        authUser
                                            .setPhone({
                                                countryCode: code,
                                                phoneNumber: phone,
                                            })
                                            .then((response: promiseType) => {
                                                if (
                                                    response.status ===
                                                    requestStatus.SUCCESS
                                                ) {
                                                    currentUser &&
                                                    currentUser.profile
                                                        ? setCurrentUser({
                                                              ...currentUser,
                                                              profile: {
                                                                  ...currentUser.profile,
                                                                  countryCode:
                                                                      code,
                                                                  phoneNumber:
                                                                      phone,
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
                                                                onPress:
                                                                    () => {},
                                                            },
                                                        ]
                                                    )
                                                }
                                            })
                                } else {
                                    Alert.alert(
                                        'Missing Details',
                                        'Please enter your phone number before updating it.',
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
                                size={28}
                                color={themeColors.GREEN}
                                style={styles.iconButton}
                            />
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
        borderBottomWidth: 1,
        textAlignVertical: 'center',
    },
    phoneInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '70%',
        paddingTop: '5%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 1,
        textAlignVertical: 'center',
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
        color: themeColors.GREEN,
    },
})

export default EditPhoneNumberScreen
