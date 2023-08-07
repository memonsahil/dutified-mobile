import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements'
import { black, green, white } from '../theme/colors'
import screens from '../types/params/screens'
import chatCardProps from '../types/props/components/chatCardProps'

const ChatCard = (props: chatCardProps) => {
    const { receiverUserId, firstName, lastName, imageSrc, lastMessage } = props

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
                    <Text
                        style={styles.chatText}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {lastMessage}
                    </Text>
                </View>
                <View style={styles.optionsSection}>
                    <SimpleLineIcons
                        style={styles.options}
                        name="options"
                        size={20}
                        color="black"
                        onPress={() =>
                            Alert.alert(
                                'Report User',
                                'Report inappropriate or suspicious activity.',
                                [
                                    {
                                        text: `Report ${firstName} ${lastName}`,

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
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        borderRadius: 5,
        width: '90%',
        overflow: 'hidden',
        marginBottom: 20,
    },
    touchableSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    avatarContainer: {
        backgroundColor: green,
        alignSelf: 'center',
    },
    chatInfoSection: {
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        width: 250,
    },
    name: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 18,
        color: black,
    },
    chatText: {
        fontFamily: 'IBMPlexSans-Regular',
        fontSize: 16,
        color: black,
        paddingTop: 10,
    },
    optionsSection: {
        justifyContent: 'flex-start',
        paddingTop: 10,
    },
    options: {
        backgroundColor: green,
        padding: 5,
    },
})

export default ChatCard
