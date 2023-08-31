import { useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../../params/screens'

const PasswordScreen = () => {
    const [password, setPassword] = useState('')

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign
                            name="caretleft"
                            size={30}
                            color={themeColors.YELLOW_GREEN}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Password</Text>
                </View>
                <Text style={styles.text}>Enter your new password below.</Text>
                <View style={styles.passwordSection}>
                    <Text style={styles.field}>New Password</Text>
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
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.button}>Save</Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.BLACK,
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
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.PLATINUM,
        paddingLeft: 20,
        paddingRight: 30,
    },
    text: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.PLATINUM,
        paddingTop: '5%',
        width: '80%',
    },
    passwordSection: {
        width: '80%',
        justifyContent: 'space-around',
    },
    field: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        paddingTop: '10%',
        color: themeColors.PLATINUM,
    },
    input: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.PLATINUM,
        width: '100%',
        paddingTop: '5%',
        borderBottomColor: themeColors.PLATINUM,
        borderBottomWidth: 2,
        alignSelf: 'center',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
        alignSelf: 'center',
        paddingTop: '10%',
        paddingBottom: '20%',
    },
})

export default PasswordScreen
