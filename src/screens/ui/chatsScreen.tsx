import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import ChatCard from '../../components/cards/chatCard'
import * as Crypto from 'expo-crypto'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import chatCardProps from '../../components/types/chatCardProps'

const ChatsScreen = () => {
    const [chats, setChats] = useState<[]>([])
    const [chatCardDetails, setChatCardDetails] = useState<chatCardProps[]>([])

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
        backgroundColor: themeColors.BLACK,
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
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
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
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        textAlign: 'center',
    },
})

export default ChatsScreen
