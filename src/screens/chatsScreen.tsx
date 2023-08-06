import { StyleSheet, Text, ScrollView, View, Platform } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'
import ChatCard from '../components/chatCard'
import { blue, green, white } from '../theme/colors'
import screens from '../types/params/screens'

const ChatsScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <AntDesign
                        name="caretleft"
                        size={30}
                        color={green}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.heading}>Chats</Text>
                </View>
                <View style={styles.topSpacer} />
                <ChatCard
                    receiverUserId={
                        Platform.OS === 'ios'
                            ? 'J6SPYTpEqmRZ1t7R34b1qwPIPLu1'
                            : '9ubbIW8PvzOz0UjvZNQr9XHpcpZ2'
                    }
                />
                <ChatCard
                    receiverUserId={
                        Platform.OS === 'ios'
                            ? 'J6SPYTpEqmRZ1t7R34b1qwPIPLu1'
                            : '9ubbIW8PvzOz0UjvZNQr9XHpcpZ2'
                    }
                />
                <ChatCard
                    receiverUserId={
                        Platform.OS === 'ios'
                            ? 'J6SPYTpEqmRZ1t7R34b1qwPIPLu1'
                            : '9ubbIW8PvzOz0UjvZNQr9XHpcpZ2'
                    }
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: blue,
    },
    scrollView: {
        alignItems: 'center',
        paddingBottom: '20%',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 30,
        color: white,
        paddingLeft: 20,
        paddingRight: 30,
    },
    topSpacer: {
        paddingTop: 20,
    },
})

export default ChatsScreen
