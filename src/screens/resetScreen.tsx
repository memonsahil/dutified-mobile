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
import { blue, gray, green, white } from '../theme/colors'
import screens from '../types/params/screens'

const ResetScreen = () => {
    const [email, setEmail] = useState('')

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
                        <AntDesign name="caretleft" size={30} color={green} />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Reset</Text>
                </View>
                <Text style={styles.text}>
                    Enter the email address associated with your account to
                    receive a verification code.
                </Text>
                <View style={styles.resetSection}>
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
                </View>
                <TouchableOpacity>
                    <Text
                        onPress={() => navigation.navigate('Verification')}
                        style={styles.button}
                    >
                        Send
                    </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blue,
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
        color: white,
        paddingLeft: 20,
        paddingRight: 30,
    },
    text: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 18,
        color: white,
        paddingTop: '5%',
        width: '80%',
    },
    resetSection: {
        width: '80%',
        justifyContent: 'space-around',
    },
    field: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 25,
        paddingTop: '10%',
        color: white,
    },
    input: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 20,
        color: white,
        width: '100%',
        paddingTop: '5%',
        borderBottomColor: white,
        borderBottomWidth: 2,
        alignSelf: 'center',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 25,
        color: green,
        alignSelf: 'center',
        paddingTop: '10%',
        paddingBottom: '20%',
    },
})

export default ResetScreen
