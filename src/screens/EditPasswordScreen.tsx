import { useState } from 'react'
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
import colors from '../enums/colors'
import fonts from '../enums/fonts'
import screens from '../types/params/screens'

const EditPasswordScreen = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { userDetails } = useAuthStore((state) => state)

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
                                <AntDesign
                                    name="caretleft"
                                    size={30}
                                    color={colors.YELLOW_GREEN}
                                />
                            </TouchableOpacity>
                            <Text style={styles.heading}>Password</Text>
                        </View>
                        <Text style={styles.field}>Current Password</Text>
                        <TextInput
                            placeholder="••••••••"
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            style={styles.textInput}
                            placeholderTextColor={colors.SILVER}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                        />
                        <Text style={styles.field}>New Password</Text>
                        <TextInput
                            placeholder="••••••••"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            style={styles.textInput}
                            placeholderTextColor={colors.SILVER}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            style={styles.saveButtonContainer}
                            onPress={() => {
                                if (
                                    currentPassword !== '' &&
                                    newPassword !== ''
                                ) {
                                    setLoading(true)

                                    AuthUser.setPassword({
                                        emailAddress: userDetails.emailAddress,
                                        currentPassword: currentPassword,
                                        newPassword: newPassword,
                                    })
                                        .then(() => {
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
                                        'Please enter current and new password before updating it.',
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
                        color={colors.YELLOW_GREEN}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.RAISIN_BLACK,
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
        fontSize: fonts.HEADING_TWO,
        color: colors.PLATINUM,
        paddingLeft: 20,
        paddingRight: 30,
    },
    field: {
        alignSelf: 'flex-start',
        paddingLeft: 40,
        paddingTop: '7%',
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.BUTTON_ONE,
        color: colors.PLATINUM,
    },
    textInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fonts.INPUT_ONE,
        color: colors.PLATINUM,
        width: '80%',
        paddingTop: '5%',
        borderBottomColor: colors.PLATINUM,
        borderBottomWidth: 2,
        alignSelf: 'center',
    },
    saveButtonContainer: {
        paddingTop: '10%',
    },
    saveButton: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.BUTTON_ONE,
        color: colors.YELLOW_GREEN,
    },
})

export default EditPasswordScreen
