import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { s, vs } from 'react-native-size-matters'

const MainScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.mainSection}>
                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <MaterialCommunityIcons
                        name="account"
                        size={26}
                        color={themeColors.GREEN}
                        style={styles.iconButton}
                    />
                    <Text style={styles.button}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <MaterialCommunityIcons
                        name="login"
                        size={26}
                        color={themeColors.GREEN}
                        style={styles.iconButton}
                    />
                    <Text style={styles.button}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => navigation.navigate('Support')}
                >
                    <MaterialCommunityIcons
                        name="help-circle"
                        size={26}
                        color={themeColors.GREEN}
                        style={styles.iconButton}
                    />
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
        height: vs(200),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginRight: s(10),
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.GREEN,
    },
    text: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.WHITE,
    },
})

export default MainScreen
