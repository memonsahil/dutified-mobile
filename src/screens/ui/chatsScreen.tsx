import React, { useState } from 'react'
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import ChatCard from '../../components/cards/chatCard'
import * as Crypto from 'expo-crypto'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import chatCardProps from '../../components/props/chatCardProps'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import screens from '../params/screens'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ChatsScreen = () => {
    const [chatCardDetails, setChatCardDetails] = useState<chatCardProps[]>([])

    const navigation: NavigationProp<screens> = useNavigation()

    const chatCards: chatCardProps[] = [
        {
            userId: '1',
            firstName:
                'A very very very very long first name that will be truncated',
            lastName:
                'A very very very very long last name that will be truncated',
            imageSrc: '',
            lastMessage:
                'A very very very very long last message that will be truncated',
        },
        {
            userId: '2',
            firstName: 'Jane',
            lastName: 'Doe',
            imageSrc: '',
            lastMessage: 'Hello World!',
        },
        {
            userId: '3',
            firstName: 'John',
            lastName: 'Smith',
            imageSrc: '',
            lastMessage: 'Hello World!',
        },
        {
            userId: '4',
            firstName: 'Jane',
            lastName: 'Smith',
            imageSrc: '',
            lastMessage: 'Hello World!',
        },
        {
            userId: '5',
            firstName: 'John',
            lastName: 'Doe',
            imageSrc: '',
            lastMessage: 'Hello World!',
        },
        {
            userId: '6',
            firstName: 'Jane',
            lastName: 'Doe',
            imageSrc: '',
            lastMessage: 'Hello World!',
        },
        {
            userId: '7',
            firstName: 'John',
            lastName: 'Smith',
            imageSrc: '',
            lastMessage: 'Hello World!',
        },
        {
            userId: '8',
            firstName: 'Jane',
            lastName: 'Smith',
            imageSrc: '',
            lastMessage: 'Hello World!',
        },
    ]

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
                            size={30}
                            color={themeColors.YELLOW_GREEN}
                        />
                    </TouchableOpacity>
                </View>
                {chatCards.length !== 0 ? (
                    chatCards.map((chatCard) => (
                        <ChatCard
                            key={Crypto.randomUUID()}
                            userId={chatCard.userId}
                            firstName={chatCard.firstName}
                            lastName={chatCard.lastName}
                            imageSrc={chatCard.imageSrc}
                            lastMessage={chatCard.lastMessage}
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
