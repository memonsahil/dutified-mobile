import { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Chat from '../data/chat'
import useAuthUserStore from '../stores/useAuthUserStore'
import ChatCard from '../components/chatCard'
import * as Crypto from 'expo-crypto'
import { raisinBlack, platinum } from '../theme/colors'
import screens from '../types/params/screens'
import chatCardProps from '../types/props/components/chatCardProps'
import chatState from '../interfaces/state/chatState'

const ChatsScreen = () => {
    const [chatCardDetails, setChatCardDetails] = useState<chatCardProps[]>([])

    const [chats, setChats] = useState<chatState[]>([])

    const { userDetails } = useAuthUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        const subscriber = Chat.getAllChats({
            userId: userDetails.userId,
            setState: setChats,
        })

        return subscriber
    })

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
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
        backgroundColor: raisinBlack,
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
        fontSize: 40,
        color: platinum,
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
        fontSize: 18,
        color: platinum,
        textAlign: 'center',
    },
})

export default ChatsScreen
