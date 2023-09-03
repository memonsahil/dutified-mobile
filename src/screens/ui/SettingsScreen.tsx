import { useState } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import authUserStore from '../../state/stores/authUserStore'
import * as Progress from 'react-native-progress'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'

const SettingsScreen = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const { removeAuthUser } = authUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            {loading === false ? (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.headerSection}>
                        <Text style={styles.heading}>Settings</Text>
                    </View>
                    <Text style={styles.subHeading}>Profile</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('EditProfilePicture')
                        }
                    >
                        <Text style={styles.button}>Edit Profile Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditPhoneNumber')}
                    >
                        <Text style={styles.button}>Edit Phone Number</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditEmailAddress')}
                    >
                        <Text style={styles.button}>Edit Email Address</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditPassword')}
                    >
                        <Text style={styles.button}>Edit Password</Text>
                    </TouchableOpacity>
                    <Text style={styles.subHeading}>Account</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Support')}
                    >
                        <Text style={styles.button}>Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setLoading(true)
                        }}
                    >
                        <Text style={styles.button}>Sign Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={themeColors.YELLOW_GREEN}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.BLACK,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom: '20%',
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '20%',
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
    },
    subHeading: {
        alignSelf: 'flex-start',
        paddingLeft: 30,
        paddingTop: 20,
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.WHITE,
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
        paddingTop: '5%',
        paddingLeft: '10%',
    },
})

export default SettingsScreen
