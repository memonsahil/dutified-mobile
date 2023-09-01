import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../../params/screens'

const SupportScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                        name="caretleft"
                        size={30}
                        color={themeColors.YELLOW_GREEN}
                    />
                </TouchableOpacity>
                <Text style={styles.heading}>Support</Text>
            </View>
            <View style={styles.buttonSection}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Contact')}
                >
                    <Text style={styles.button}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <Text style={styles.button}>About</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.BLACK,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.PLATINUM,
        paddingLeft: '5%',
    },
    buttonSection: {
        paddingTop: '10%',
        paddingLeft: '10%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
        paddingBottom: '10%',
    },
})

export default SupportScreen
