import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import { AntDesign } from '@expo/vector-icons'
import { blue, green, white } from '../theme/colors'
import screens from '../types/params/screens'

const ContactScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="caretleft" size={30} color={green} />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Contact</Text>
                </View>
                <Text style={styles.text}>
                    Contact us for any of your queries or just send us some
                    feedback and will get back to you within a day.
                </Text>
                <TouchableOpacity
                    onPress={() =>
                        MailComposer.composeAsync({
                            recipients: ['support@dutified.com'],
                        }).catch(() => {
                            Alert.alert(
                                'Setup Email',
                                'Please setup your email address on this device first.',
                                [
                                    {
                                        text: 'Dismiss',
                                        onPress: () => {},
                                    },
                                ]
                            )
                        })
                    }
                >
                    <Text style={styles.email}>support@dutified.com</Text>
                </TouchableOpacity>
            </ScrollView>
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
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 30,
        color: white,
        paddingLeft: 20,
        paddingRight: 30,
    },
    text: {
        fontFamily: 'IBMPlexSans-Regular',
        fontSize: 18,
        color: white,
        paddingTop: '5%',
        width: '80%',
    },
    email: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 25,
        paddingTop: '10%',
        color: green,
    },
})

export default ContactScreen
