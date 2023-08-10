import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements'
import { black, green, white } from '../theme/colors'
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
                            color="black"
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
        backgroundColor: white,
        borderRadius: 20,
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
        backgroundColor: green,
        alignSelf: 'center',
    },
    chatInfoSection: {
        justifyContent: 'space-between',
        paddingLeft: 10,
        width: 250,
        alignSelf: 'center',
    },
    name: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: black,
    },
    optionsSection: {
        justifyContent: 'flex-start',
        alignSelf: 'center',
    },
    options: {
        backgroundColor: green,
        padding: 5,
    },
})

export default ChatCard
