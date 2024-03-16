import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import ChatCard from '../../components/cards/chatCard'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import screens from '../params/screens'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import authStore from '../../state/stores/authStore'

const ChatsScreen = () => {
    const currentUser = authStore((state) => state.currentUser)

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>Chats</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Network')}
                    >
                        <MaterialCommunityIcons
                            name="account-group"
                            size={26}
                            color={themeColors.GREEN}
                        />
                    </TouchableOpacity>
                </View>
                {currentUser?.chats.length !== 0 ? (
                    currentUser?.chats.map((chat) => (
                        <ChatCard
                            key={chat.chatId}
                            userId={
                                chat.initialSenderId ===
                                currentUser.profile?.userId
                                    ? chat.initialReceiverId
                                    : chat.initialSenderId
                            }
                            userName={
                                chat.initialSenderId ===
                                currentUser.profile?.userId
                                    ? chat.initialReceiverName
                                    : chat.initialSenderName
                            }
                            imageSrc={
                                chat.initialSenderId ===
                                currentUser.profile?.userId
                                    ? chat.initialReceiverAvatar
                                    : chat.initialSenderAvatar
                            }
                            lastMessage={chat.messages[0]?.text}
                        />
                    ))
                ) : (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            Users that you chat with will be shown here.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.BLACK,
    },
    scrollView: {
        alignItems: 'center',
        paddingBottom: '20%',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: '10%',
        paddingRight: '10%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
        justifyContent: 'space-between',
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingTop: '10%',
        paddingBottom: '10%',
        textAlign: 'center',
    },
})

export default ChatsScreen
