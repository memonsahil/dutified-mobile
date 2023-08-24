import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import colors from '../enums/colors'
import fonts from '../enums/fonts'
import screens from '../types/params/screens'

const SupportScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                        name="caretleft"
                        size={30}
                        color={colors.YELLOW_GREEN}
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
        backgroundColor: colors.RAISIN_BLACK,
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
        fontSize: fonts.HEADING_TWO,
        color: colors.PLATINUM,
        paddingLeft: 20,
        paddingRight: 30,
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.BUTTON_ONE,
        color: colors.YELLOW_GREEN,
        paddingTop: '5%',
        paddingLeft: '10%',
    },
})

export default SupportScreen
