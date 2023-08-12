import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Alert,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import useAuthUserStore from '../stores/useAuthUserStore'
import useUserStore from '../stores/useUserStore'
import ChatCard from '../components/chatCard'
import * as Progress from 'react-native-progress'
import * as Crypto from 'expo-crypto'
import { AntDesign } from '@expo/vector-icons'
import { raisinBlack, yellowGreen, platinum } from '../theme/colors'
import screens from '../types/params/screens'
import chatCardProps from '../types/props/components/chatCardProps'

const ChatsScreen = () => {
    const [chatCardDetails, setChatCardDetails] = useState<chatCardProps[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const { userDetails, getAllChats } = useAuthUserStore((state) => state)
    const { getUserData } = useUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        getAllChats(userDetails.userId)
            .then((result) => {
                if (result.data.length !== 0) {
                    result.data.forEach((chat) => {
                        getUserData(
                            userDetails.userId === chat.senderUserId
                                ? chat.receiverUserId
                                : chat.senderUserId
                        )
                            .then((result) => {
                                setChatCardDetails([
                                    ...chatCardDetails,
                                    {
                                        receiverUserId:
                                            result.data?.userDetails.userId!,
                                        firstName:
                                            result.data?.userDetails.firstName!,
                                        lastName:
                                            result.data?.userDetails.lastName!,
                                        imageSrc:
                                            result.data?.userDetails.imageSrc!,
                                    },
                                ])

                                setLoading(false)
                            })
                            .catch(() => {
                                Alert.alert(
                                    'Error Occurred',
                                    'An error occurred, please try again or contact our support team.',
                                    [
                                        {
                                            text: 'Dismiss',
                                            onPress: () => {
                                                navigation.goBack()
                                            },
                                        },
                                    ]
                                )
                            })
                    })
                } else setLoading(false)
            })
            .catch(() => {
                Alert.alert(
                    'Error Occurred',
                    'An error occurred, please try again or contact our support team.',
                    [
                        {
                            text: 'Dismiss',
                            onPress: () => {
                                navigation.goBack()
                            },
                        },
                    ]
                )
            })
    }, [])

    return (
        <View style={styles.container}>
            {loading === false ? (
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
                                Workmates that you interact with will be shown
                                here.
                            </Text>
                        </View>
                    )}
                </ScrollView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={yellowGreen}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: raisinBlack,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
