import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import Chat from '../data/chat'
import User from '../data/user'
import useAuthUserStore from '../stores/useAuthUserStore'
import ChatCard from '../components/chatCard'
import * as Crypto from 'expo-crypto'
import colors from '../enums/colors'
import fonts from '../enums/fonts'
import chatCardProps from '../types/props/components/chatCardProps'
import chatState from '../interfaces/state/chatState'

// Todo: Test on a real device.
const ChatsScreen = () => {
    const [chats, setChats] = useState<chatState[]>([])
    const [chatCardDetails, setChatCardDetails] = useState<chatCardProps[]>([])

    const { userDetails } = useAuthUserStore((state) => state)

    /*
    useEffect(() => {
        const subscriber = Chat.getAllChats({
            userId: userDetails.userId,
            setChats: setChats,
        })

        return () => subscriber()
    }, [])

    useEffect(() => {
        populateChatCardDetails()
    }, [chats])

    const populateChatCardDetails = async () => {
        const newChatCardDetails: chatCardProps[] = []

        await Promise.all(
            chats.map(async (chat) => {
                const userIdToFetch =
                    userDetails.userId !== chat.senderUserId
                        ? chat.senderUserId
                        : chat.receiverUserId

                const result = await User.getUserData(userIdToFetch)

                newChatCardDetails.push({
                    receiverUserId: result.data.userDetails.userId,
                    firstName: result.data.userDetails.firstName,
                    lastName: result.data.userDetails.lastName,
                    imageSrc: result.data.userDetails.imageSrc,
                })
            })
        )

        setChatCardDetails(newChatCardDetails)
    }
    */

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <Text style={styles.heading}>Chats</Text>
                </View>
                <View style={styles.topSpacer} />
                {chatCardDetails.length !== 0 ? (
                    chatCardDetails.map((chatCard) => (
                        <ChatCard
                            key={Crypto.randomUUID()}
                            receiverUserId={chatCard.receiverUserId}
                            firstName={chatCard.firstName}
                            lastName={chatCard.lastName}
                            imageSrc={chatCard.imageSrc}
                        />
                    ))
                ) : (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            Users that you interact with will be shown here.
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
        backgroundColor: colors.RAISIN_BLACK,
    },
    scrollView: {
        alignItems: 'center',
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
        fontSize: fonts.HEADING_ONE,
        color: colors.PLATINUM,
    },
    topSpacer: {
        paddingTop: 20,
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fonts.BODY_ONE,
        color: colors.PLATINUM,
        textAlign: 'center',
    },
})

export default ChatsScreen
