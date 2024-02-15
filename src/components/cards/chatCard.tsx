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
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import screens from '../../screens/params/screens'
import chatCardProps from '../props/chatCardProps'

const ChatCard = (props: chatCardProps) => {
    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('Chat', { userId: props.userId })
                }
                style={styles.touchableSection}
            >
                <Avatar
                    size="medium"
                    rounded
                    source={
                        props.imageSrc
                            ? { uri: props.imageSrc }
                            : require('../../../assets/images/user-avatar.png')
                    }
                    containerStyle={styles.avatarContainer}
                />
                <View style={styles.userInfo}>
                    <Text
                        style={styles.userName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {`${props.userName}`}
                    </Text>
                    <Text
                        style={styles.messageText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >{`${props.lastMessage}`}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            `Report ${props.userName}`,
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
                        size={26}
                        color={themeColors.YELLOW_GREEN}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.WHITE,
        borderRadius: 20,
        width: '90%',
        overflow: 'hidden',
        paddingTop: '5%',
        paddingBottom: '5%',
        marginTop: '5%',
    },
    touchableSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
        alignSelf: 'center',
    },
    userInfo: {
        flex: 1,
        marginLeft: '5%',
    },
    userName: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        marginRight: '3%',
    },
    messageText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        paddingTop: '5%',
        width: '90%',
    },
})

export default ChatCard
