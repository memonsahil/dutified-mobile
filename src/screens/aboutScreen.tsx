import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import colors from '../enums/colors'
import fonts from '../enums/fonts'
import screens from '../types/params/screens'

const AboutScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign
                            name="caretleft"
                            size={30}
                            color={colors.YELLOW_GREEN}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>About</Text>
                </View>
                <Text style={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                <View style={styles.aboutSection}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('TOS')}
                    >
                        <Text style={styles.button}>Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('PP')}>
                        <Text style={styles.button}>Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.version}>1.0.0</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.RAISIN_BLACK,
    },
    scrollView: {
        alignItems: 'center',
        justifyContent: 'space-between',
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
    text: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fonts.BODY_ONE,
        color: colors.PLATINUM,
        paddingTop: '5%',
        width: '80%',
    },
    aboutSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '5%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.BUTTON_ONE,
        paddingTop: '10%',
        color: colors.YELLOW_GREEN,
    },
    version: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.BODY_THREE,
        marginTop: '10%',
        color: colors.PLATINUM,
        paddingBottom: '20%',
    },
})

export default AboutScreen
