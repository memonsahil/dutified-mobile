import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Avatar } from 'react-native-elements'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import screens from '../../screens/params/screens'
import notificationCardProps from '../props/notificationCardProps'
import notification from '../../enums/notification'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import authStore from '../../state/stores/authStore'

const NotificationCard = (props: notificationCardProps) => {
    const currentUser = authStore((state) => state.currentUser)

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <Text style={styles.info}>
                {props.type === notification.INVITE_SENT
                    ? `Invite Sent`
                    : props.type === notification.INVITE_RECEIVED
                    ? `Invite Received`
                    : null}
            </Text>
            <Text style={styles.infoText}>
                {props.type === notification.INVITE_SENT
                    ? `You sent an invite to ${props.info.userName} to join your network.`
                    : props.type === notification.INVITE_RECEIVED
                    ? `${props.info.userName} sent you an invite to joint their network.`
                    : null}
            </Text>
            <View style={styles.nameWrapper}>
                <TouchableOpacity
                    onPress={() =>
                        props.info.userId &&
                        props.info.userId !== currentUser?.profile.userId
                            ? navigation.navigate('User', {
                                  userId: props.info.userId,
                              })
                            : navigation.navigate('Profile')
                    }
                >
                    <Avatar
                        size="medium"
                        rounded
                        source={
                            props.info.userAvatar
                                ? { uri: props.info.userAvatar }
                                : require('../../../assets/images/user-avatar.png')
                        }
                        containerStyle={styles.avatarContainer}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        props.info.userId &&
                        props.info.userId !== currentUser?.profile.userId
                            ? navigation.navigate('User', {
                                  userId: props.info.userId,
                              })
                            : navigation.navigate('Profile')
                    }}
                >
                    <Text
                        style={styles.info}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {props.info.userName}
                    </Text>
                </TouchableOpacity>
            </View>
            {props.type === notification.INVITE_RECEIVED &&
            props.info.actioned === false ? (
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            `Action Invite`,
                            `Action this invite from ${props.info.userName} to join their network.`,
                            [
                                {
                                    text: `Accept`,

                                    onPress: () => {},
                                },
                                {
                                    text: 'Decline',
                                    onPress: () => {},
                                },
                            ]
                        )
                    }}
                    style={styles.actionButtonWrapper}
                >
                    <MaterialCommunityIcons
                        name="hand-back-left"
                        size={26}
                        color={themeColors.YELLOW_GREEN}
                        style={styles.buttonIcon}
                    />
                    <Text style={styles.actionButton}>Action</Text>
                </TouchableOpacity>
            ) : props.type === notification.INVITE_RECEIVED &&
              props.info.actioned === true ? (
                <Text style={styles.infoText}>
                    You already actioned this invite.
                </Text>
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.WHITE,
        borderRadius: 20,
        width: '90%',
        overflow: 'hidden',
        paddingTop: '5%',
        paddingBottom: '5%',
        marginBottom: '5%',
        paddingHorizontal: '5%',
    },
    info: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
    },
    infoText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        marginTop: '5%',
    },
    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginTop: '5%',
    },
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
        marginRight: '5%',
    },
    actionButtonWrapper: {
        marginTop: '5%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
    },
    buttonIcon: {
        marginRight: '3%',
    },
})

export default NotificationCard
