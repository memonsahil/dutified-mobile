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
import * as Progress from 'react-native-progress'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'

const EditPasswordScreen = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

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
                                    size={26}
                                    color={themeColors.YELLOW_GREEN}
                                />
                            </TouchableOpacity>
                            <Text style={styles.heading}>Password</Text>
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>Current Password</Text>
                            <TextInput
                                placeholder="••••••••"
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>New Password</Text>
                            <TextInput
                                placeholder="••••••••"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect={false}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.saveButtonContainer}
                            onPress={() => {
                                if (
                                    currentPassword !== '' &&
                                    newPassword !== ''
                                ) {
                                    setLoading(true)
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

export default EditPasswordScreen
