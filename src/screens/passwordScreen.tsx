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
import { raisinBlack, silver, yellowGreen, platinum } from '../theme/colors'
import screens from '../types/params/screens'

const PasswordScreen = () => {
    const [password, setPassword] = useState('')

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
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
                            color={yellowGreen}
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
                        placeholderTextColor={silver}
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
        backgroundColor: raisinBlack,
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
        fontSize: 30,
        color: platinum,
        paddingLeft: 20,
        paddingRight: 30,
    },
    text: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 18,
        color: platinum,
        paddingTop: '5%',
        width: '80%',
    },
    passwordSection: {
        width: '80%',
        justifyContent: 'space-around',
    },
    field: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 25,
        paddingTop: '10%',
        color: platinum,
    },
    input: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 20,
        color: platinum,
        width: '100%',
        paddingTop: '5%',
        borderBottomColor: platinum,
        borderBottomWidth: 2,
        alignSelf: 'center',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 25,
        color: yellowGreen,
        alignSelf: 'center',
        paddingTop: '10%',
        paddingBottom: '20%',
    },
})

export default PasswordScreen
