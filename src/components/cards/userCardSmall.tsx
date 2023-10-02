import { View, Text, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import userCardSmallProps from '../props/userCardSmallProps'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const UserCardSmall = (props: userCardSmallProps) => {
    return (
        <View style={styles.container}>
            <Avatar
                size="medium"
                rounded
                source={
                    props.image
                        ? { uri: props.image }
                        : require('../../../assets/images/user-avatar.png')
                }
                containerStyle={styles.avatarContainer}
            />
            <View style={styles.userInfo}>
                <Text
                    style={styles.userName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {`${props.first} ${props.last}`}
                </Text>
                <View style={styles.ratingContainer}>
                    <MaterialCommunityIcons
                        name="star"
                        size={20}
                        color={themeColors.YELLOW_GREEN}
                    />
                    <Text
                        style={styles.ratingText}
                    >{`${props.avgRatings}`}</Text>
                </View>
            </View>
            <MaterialCommunityIcons
                name="dots-vertical"
                size={30}
                color={themeColors.BLACK}
                style={styles.icon}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themeColors.WHITE,
        width: '90%',
        marginBottom: '5%',
        borderRadius: 20,
        paddingVertical: '5%',
        overflow: 'hidden',
        paddingLeft: '5%',
    },
    icon: {
        marginRight: '5%',
    },
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
    },
    userInfo: {
        flex: 1,
        marginLeft: '5%',
    },
    userName: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        marginBottom: '3%',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        marginLeft: '2%',
    },
})

export default UserCardSmall
