import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'

const SupportScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons
                        name="chevron-left-circle"
                        size={26}
                        color={themeColors.GREEN}
                    />
                </TouchableOpacity>

                <Text style={styles.heading}>Support</Text>
            </View>
            <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => navigation.navigate('Contact')}
            >
                <MaterialCommunityIcons
                    name="email-fast"
                    size={26}
                    color={themeColors.GREEN}
                    style={styles.iconButton}
                />
                <Text style={styles.button}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => navigation.navigate('About')}
            >
                <MaterialCommunityIcons
                    name="information"
                    size={26}
                    color={themeColors.GREEN}
                    style={styles.iconButton}
                />
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
    buttonSection: {
        paddingTop: '10%',
        paddingLeft: '10%',
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '10%',
    },
    iconButton: {
        marginRight: '3%',
        paddingLeft: '10%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.GREEN,
    },
})

export default SupportScreen
