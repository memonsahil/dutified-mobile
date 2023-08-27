import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements'
import themeColors from '../enums/themeColors'
import fontSizes from '../enums/fontSizes'
import screens from '../types/params/screens'
import chatCardProps from '../types/props/components/chatCardProps'

const ChatCard = (props: chatCardProps) => {
    const { receiverUserId, firstName, lastName, imageSrc } = props

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.touchableSection}
                onPress={() =>
                    navigation.navigate('Chat', {
                        receiverUserId: receiverUserId,
                    })
                }
            >
                <Avatar
                    size="medium"
                    rounded
                    source={
                        imageSrc
                            ? { uri: imageSrc }
                            : require('../../assets/images/user-avatar.png')
                    }
                    containerStyle={styles.avatarContainer}
                />
                <View style={styles.chatInfoSection}>
                    <Text
                        style={styles.name}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {`${firstName} ${lastName}`}
                    </Text>
                </View>
                <View style={styles.optionsSection}>
                    <TouchableOpacity
                        onPress={() =>
                            Alert.alert(
                                `Report ${firstName} ${lastName}`,
                                'Report inappropriate or suspicious activity.',
                                [
                                    {
                                        text: `Report`,

                                        onPress: () =>
                                            MailComposer.composeAsync({
                                                recipients: [
                                                    'support@dutified.com',
                                                ],
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
                                            }),
                                    },
                                    {
                                        text: 'Dismiss',
                                        onPress: () => {},
                                    },
                                ]
                            )
                        }
                    >
                        <SimpleLineIcons
                            style={styles.options}
                            name="options"
                            size={20}
                            color={themeColors.JET}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.PLATINUM,
        borderRadius: 15,
        width: '90%',
        overflow: 'hidden',
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 20,
    },
    touchableSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
        alignSelf: 'center',
    },
    chatInfoSection: {
        justifyContent: 'space-between',
        paddingLeft: 10,
        width: 250,
        alignSelf: 'center',
    },
    name: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.JET,
    },
    optionsSection: {
        justifyContent: 'flex-start',
        alignSelf: 'center',
    },
    options: {
        backgroundColor: themeColors.YELLOW_GREEN,
        padding: 5,
    },
})

export default ChatCard
