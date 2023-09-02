import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'

const MainScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.mainSection}>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.button}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.button}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Support')}
                >
                    <Text style={styles.button}>Support</Text>
                </TouchableOpacity>
                <Text style={styles.text}>1.0.0</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.BLACK,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainSection: {
        height: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
    },
    text: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.WHITE,
    },
})

export default MainScreen
