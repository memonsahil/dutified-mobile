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
import UserCardSmall from '../../components/cards/userCardSmall'
import util from '../../util/util'
import networkScreenProps from '../props/networkScreenProps'

const NetworkScreen = ({ route }: networkScreenProps) => {
    const { network } = route.params

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons
                            name="chevron-left-circle"
                            size={26}
                            color={themeColors.GREEN}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Network</Text>
                </View>
                <View style={styles.usersList}>
                    {network?.length !== 0 ? (
                        <>
                            {network?.map((user) => (
                                <UserCardSmall
                                    key={user.profile.userId!}
                                    userId={user.profile.userId!}
                                    first={user.profile.firstName!}
                                    last={user.profile.lastName!}
                                    image={user.profile.profilePicture!}
                                    avgRatings={util.avgRating(
                                        user?.feedbacks ? user?.feedbacks : []
                                    )}
                                />
                            ))}
                        </>
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>No users yet.</Text>
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
