import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import userCardSmallProps from '../../components/props/userCardSmallProps'
import UserCardSmall from '../../components/cards/userCardSmall'

const NetworkScreen = () => {
    const users: Array<userCardSmallProps> = [
        {
            userId: '1',
            first: 'Sahil',
            last: 'Memon',
            image: '',
            avgRatings: '4.5',
        },
        {
            userId: '2',
            first: 'Sahil',
            last: 'Memon',
            image: '',
            avgRatings: '4.5',
        },
        {
            userId: '3',
            first: 'Sahil',
            last: 'Memon',
            image: '',
            avgRatings: '4.5',
        },
        {
            userId: '4',
            first: 'Sahil',
            last: 'Memon',
            image: '',
            avgRatings: '4.5',
        },
    ]

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left-circle"
                            size={30}
                            color={themeColors.YELLOW_GREEN}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Network</Text>
                </View>
                <View style={styles.usersList}>
                    {users.length !== 0 ? (
                        <>
                            {users.map((user) => (
                                <UserCardSmall
                                    key={user.userId}
                                    userId={user.userId}
                                    first={user.first}
                                    last={user.last}
                                    image={user.image}
                                    avgRatings={user.avgRatings}
                                />
                            ))}
                        </>
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>
                                Users that you add to your network will be shown
                                here.
                            </Text>
                        </View>
                    )}
                </View>
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
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
        paddingLeft: '5%',
    },
    usersList: {
        width: '100%',
        alignItems: 'center',
        marginTop: '5%',
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingTop: '5%',
        textAlign: 'center',
    },
})

export default NetworkScreen
