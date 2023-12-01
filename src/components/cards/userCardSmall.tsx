import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Linking,
} from 'react-native'
import { Avatar } from 'react-native-elements'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import userCardSmallProps from '../props/userCardSmallProps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import screens from '../../screens/params/screens'

const UserCardSmall = (props: userCardSmallProps) => {
    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('User', { userId: props.userId })
                }
            >
                <Avatar
                    size="medium"
                    rounded
                    source={
                        props.image
                            ? { uri: props.image }
                            : require('../../../assets/images/user-avatar.png')
                    }
                    containerStyle={styles.avatarContainer}
                />
            </TouchableOpacity>
            <View style={styles.userInfo}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('User', { userId: props.userId })
                    }
                >
                    <Text style={styles.userName}>
                        {`${props.first} ${props.last}`}
                    </Text>
                </TouchableOpacity>
                <View style={styles.ratingContainer}>
                    <MaterialCommunityIcons
                        name="star"
                        size={20}
                        color={themeColors.YELLOW_GREEN}
                    />
                    <Text
                        style={styles.ratingText}
                    >{`${props.avgRatings}`}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        `Report ${props.first} ${props.last}`,
                        'Report inappropriate or suspicious activity.',
                        [
                            {
                                text: `Report`,

                                onPress: () =>
                                    Linking.openURL(
                                        'mailto:support@dutified.com'
                                    ).catch(() => {
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
                                    }),
                            },
                            {
                                text: 'Dismiss',
                                onPress: () => {},
                            },
                        ]
                    )
                }}
            >
                <MaterialCommunityIcons
                    name="dots-vertical"
                    size={25}
                    color={themeColors.YELLOW_GREEN}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themeColors.WHITE,
        width: '90%',
        marginBottom: '5%',
        borderRadius: 20,
        paddingVertical: '5%',
        overflow: 'hidden',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    icon: {
        marginRight: '5%',
    },
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
    },
    userInfo: {
        flex: 1,
        marginLeft: '5%',
    },
    userName: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        marginBottom: '3%',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        marginLeft: '2%',
    },
})

export default UserCardSmall
