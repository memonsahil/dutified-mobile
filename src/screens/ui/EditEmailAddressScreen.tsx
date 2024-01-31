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
import authStore from '../../state/stores/authStore'
import authUser from '../../data/classes/authUser'
import promiseType from '../../data/types/promiseType'
import requestStatus from '../../enums/requestStatus'

const EditEmailAddressScreen = () => {
    const [currentEmail, setCurrentEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [newEmail, setNewEmail] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { currentUser, setCurrentUser } = authStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        currentUser?.profile.emailAddress &&
        currentUser?.profile.emailAddress !== currentEmail
            ? setCurrentEmail(currentUser?.profile.emailAddress)
            : setCurrentEmail('')
    }, [currentUser?.profile.emailAddress])

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
                            <Text style={styles.heading}>Email Address</Text>
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>
                                Current Email Address
                            </Text>
                            <TextInput
                                placeholder="email@domain.com"
                                value={currentEmail}
                                onChangeText={setCurrentEmail}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                inputMode="email"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>Password</Text>
                            <TextInput
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>New Email Address</Text>
                            <TextInput
                                placeholder="email@domain.com"
                                value={newEmail}
                                onChangeText={setNewEmail}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                inputMode="email"
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.saveButtonContainer}
                            onPress={() => {
                                if (
                                    currentEmail !== '' &&
                                    password !== '' &&
                                    newEmail !== ''
                                ) {
                                    setLoading(true),
                                        authUser
                                            .setEmail({
                                                oldEmail: currentEmail.trim(),
                                                password: password.trim(),
                                                newEmail: newEmail.trim(),
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
                                                                  emailAddress:
                                                                      newEmail,
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
                                        'Please enter your credential and new email address before updating it.',
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

export default EditEmailAddressScreen
