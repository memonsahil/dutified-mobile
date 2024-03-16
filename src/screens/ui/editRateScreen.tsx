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

const EditRateScreen = () => {
    const [rate, setRate] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { currentUser, setCurrentUser } = authStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        currentUser?.profile.ratePerDay &&
        currentUser?.profile.ratePerDay !== rate
            ? setRate(currentUser?.profile.ratePerDay)
            : setRate('')
    }, [currentUser?.profile.ratePerDay])

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
                            <Text style={styles.heading}>Rate/Day</Text>
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>Update Rate/Day</Text>
                            <View style={styles.amountWrapper}>
                                <Text style={styles.currency}>USD</Text>
                                <TextInput
                                    placeholder="80"
                                    value={rate}
                                    onChangeText={setRate}
                                    style={styles.amountInput}
                                    placeholderTextColor={themeColors.SILVER}
                                    inputMode="decimal"
                                />
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.saveButtonContainer}
                            onPress={() => {
                                setLoading(true)
                                authUser
                                    .setRatePerDay({
                                        ratePerDay: rate,
                                    })
                                    .then((response: promiseType) => {
                                        if (
                                            response.status ===
                                            requestStatus.SUCCESS
                                        ) {
                                            currentUser && currentUser.profile
                                                ? setCurrentUser({
                                                      ...currentUser,
                                                      profile: {
                                                          ...currentUser.profile,
                                                          ratePerDay: rate,
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
    amountWrapper: {
        flexDirection: 'row',
        paddingTop: '5%',
    },
    currency: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '20%',
        textAlignVertical: 'center',
    },
    amountInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '80%',
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

export default EditRateScreen
