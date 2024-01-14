import { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
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
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import chatScreenProps from '../props/chatScreenProps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AgreementModal from '../../components/modals/agreementModal'
import JobModal from '../../components/modals/jobModal'
import globalStore from '../../state/stores/globalStore'

const ChatScreen = ({ route }: chatScreenProps) => {
    const { userId } = route.params

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [imageSrc, setImageSrc] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [allMessages, setAllMessages] = useState<IMessage[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const {
        showAgreementModal,
        setShowAgreementModal,
        showJobModal,
        setShowJobModal,
    } = globalStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    const first = 'Sahil'
    const last = 'Memon'

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
                            <MaterialCommunityIcons
                                name="chevron-left-circle"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('User', {
                                    userId: userId,
                                })
                            }
                            style={styles.nameContainer}
                        >
                            <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={styles.name}
                            >{`${first} ${last}`}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('User', {
                                    userId: userId,
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
                            _id: userId,
                            name: `${first} ${last}`,
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
                                                themeColors.YELLOW_GREEN,
                                        },
                                        right: {
                                            backgroundColor:
                                                themeColors.YELLOW_GREEN,
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
                                    <TextInput
                                        placeholder="Enter your message."
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
                                                          createdAt: new Date(),
                                                          user: {
                                                              _id: userId,
                                                              name: `${first} ${last}`,
                                                          },
                                                      },
                                                  ])
                                                : null
                                        }
                                    >
                                        <MaterialCommunityIcons
                                            name="send-circle"
                                            size={30}
                                            color={themeColors.YELLOW_GREEN}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            setShowAgreementModal(true)
                                        }
                                    >
                                        <MaterialCommunityIcons
                                            name="handshake"
                                            size={30}
                                            color={themeColors.YELLOW_GREEN}
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                    <AgreementModal
                        visible={showAgreementModal}
                        onClose={() => setShowAgreementModal(false)}
                        userName={`${first} ${last}`}
                    />
                    <JobModal
                        visible={showJobModal}
                        onClose={() => setShowJobModal(false)}
                    />
                </>
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
        paddingBottom: '10%',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '20%',
        paddingLeft: '8%',
        paddingRight: '8%',
        paddingBottom: '5%',
        alignItems: 'center',
    },
    nameContainer: {
        width: '70%',
    },
    name: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        textAlign: 'center',
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
        paddingHorizontal: '5%',
    },
    input: {
        backgroundColor: themeColors.WHITE,
        width: '75%',
        height: Platform.OS === 'ios' ? 50 : 45,
        paddingVertical: Platform.OS === 'ios' ? 0 : 10,
        paddingLeft: Platform.OS === 'ios' ? '3%' : '5%',
        paddingRight: Platform.OS === 'ios' ? '3%' : '5%',
        borderColor: themeColors.BLACK,
        borderWidth: 4,
        borderRadius: 20,
        fontFamily: 'IBMPlexSansCondensed-Medium',
        color: themeColors.BLACK,
        fontSize: fontSizes.BODY_TWO,
    },
})

export default ChatScreen
