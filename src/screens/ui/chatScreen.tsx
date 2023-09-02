import { useState, useEffect } from 'react'
import {
    StyleSheet,
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import authUserStore from '../../state/stores/authUserStore'
import {
    GiftedChat,
    IMessage,
    Bubble,
    Day,
    Time,
} from 'react-native-gifted-chat'
import * as Crypto from 'expo-crypto'
import { Avatar } from 'react-native-elements'
import * as Progress from 'react-native-progress'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import chatScreenProps from '../props/chatScreenProps'

const ChatScreen = ({ route }: chatScreenProps) => {
    const { receiverUserId } = route.params

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [imageSrc, setImageSrc] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [allMessages, setAllMessages] = useState<IMessage[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const { account } = authUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {}, [])

    useEffect(() => {
        let timeOut = setTimeout(() => {}, 4000)

        return () => clearTimeout(timeOut)
    })

    const onSend = (newMessages: IMessage[]) => {
        setMessage('')

        setAllMessages((previousMessages: IMessage[]) =>
            GiftedChat.append(previousMessages, newMessages)
        )
    }

    return (
        <View style={styles.container}>
            {loading === false ? (
                <>
                    <View style={styles.headerSection}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign
                                name="caretleft"
                                size={30}
                                color={themeColors.AVACADO}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('User', {
                                    userId: receiverUserId,
                                })
                            }
                        >
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={styles.heading}
                            >{`${firstName} ${lastName}`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('User', {
                                    userId: receiverUserId,
                                })
                            }
                        >
                            <Avatar
                                size="small"
                                rounded
                                source={
                                    imageSrc
                                        ? { uri: imageSrc }
                                        : require('../../../assets/images/user-avatar.png')
                                }
                                containerStyle={styles.avatarContainer}
                            />
                        </TouchableOpacity>
                    </View>
                    <GiftedChat
                        messages={allMessages}
                        user={{
                            _id: account.userId,
                            name: `${account.firstName} ${account.lastName}`,
                        }}
                        renderAvatar={null}
                        listViewProps={{
                            style: styles.chatView,
                            showsVerticalScrollIndicator: false,
                        }}
                        renderDay={(props) => {
                            return (
                                <Day
                                    {...props}
                                    textStyle={{
                                        color: themeColors.WHITE,
                                        fontFamily:
                                            'IBMPlexSansCondensed-Medium',
                                    }}
                                />
                            )
                        }}
                        renderBubble={(props) => {
                            return (
                                <Bubble
                                    {...props}
                                    wrapperStyle={{
                                        left: {
                                            backgroundColor:
                                                themeColors.AVACADO,
                                        },
                                        right: {
                                            backgroundColor:
                                                themeColors.AVACADO,
                                        },
                                    }}
                                    textStyle={{
                                        left: {
                                            color: themeColors.WHITE,
                                            fontFamily:
                                                'IBMPlexSansCondensed-Medium',
                                        },
                                        right: {
                                            color: themeColors.WHITE,
                                            fontFamily:
                                                'IBMPlexSansCondensed-Medium',
                                        },
                                    }}
                                    renderTime={(props) => {
                                        return (
                                            <Time
                                                {...props}
                                                timeTextStyle={{
                                                    left: {
                                                        color: themeColors.WHITE,
                                                        fontFamily:
                                                            'IBMPlexSansCondensed-Medium',
                                                    },
                                                    right: {
                                                        color: themeColors.WHITE,
                                                        fontFamily:
                                                            'IBMPlexSansCondensed-Medium',
                                                    },
                                                }}
                                            />
                                        )
                                    }}
                                />
                            )
                        }}
                        renderInputToolbar={() => {
                            return (
                                <View style={styles.toolbar}>
                                    <View style={styles.inputSection}>
                                        <TextInput
                                            placeholder="Your message"
                                            value={message}
                                            onChangeText={setMessage}
                                            style={styles.input}
                                            placeholderTextColor={
                                                themeColors.SILVER
                                            }
                                            multiline={false}
                                        />
                                        <TouchableOpacity
                                            onPress={() =>
                                                message !== ''
                                                    ? onSend([
                                                          {
                                                              _id: Crypto.randomUUID(),
                                                              text: message,
                                                              createdAt:
                                                                  new Date(),
                                                              user: {
                                                                  _id: account.userId,
                                                                  name: `${account.firstName} ${account.lastName}`,
                                                              },
                                                          },
                                                      ])
                                                    : null
                                            }
                                        >
                                            <Ionicons
                                                name="send"
                                                size={20}
                                                color={themeColors.AVACADO}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={() => {}}>
                                        <FontAwesome5
                                            name="file-signature"
                                            size={20}
                                            color={themeColors.AVACADO}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={themeColors.AVACADO}
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
        paddingBottom: '8%',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '20%',
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.WHITE,
    },
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
    },
    chatView: {
        backgroundColor: themeColors.WHITE,
    },
    toolbar: {
        backgroundColor: themeColors.BLACK,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: Platform.OS === 'ios' ? '3%' : 0,
        paddingLeft: '2%',
        paddingRight: '4%',
    },
    inputSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
    },
    input: {
        backgroundColor: themeColors.WHITE,
        width: '100%',
        height: 45,
        paddingVertical: Platform.OS === 'ios' ? 0 : 9,
        paddingLeft: 20,
        borderColor: themeColors.BLACK,
        borderTopWidth: Platform.OS === 'ios' ? 5 : 3,
        borderBottomWidth: 5,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderRadius: 15,
        marginRight: '4%',
        fontFamily: 'IBMPlexSansCondensed-Medium',
        color: themeColors.WHITE,
        fontSize: fontSizes.BODY_TWO,
    },
})

export default ChatScreen
