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
                        color={themeColors.AVACADO}
                    />
                </TouchableOpacity>
                <Text style={styles.heading}>Support</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                <Text style={styles.button}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('About')}>
                <Text style={styles.button}>About</Text>
            </TouchableOpacity>
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
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.AVACADO,
        paddingTop: '5%',
        paddingLeft: '10%',
    },
})

export default SupportScreen
