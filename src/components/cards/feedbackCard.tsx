import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Linking,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import feedbackCardProps from '../props/feedbackCardProps'
import ratings from '../../enums/ratings'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Avatar } from 'react-native-elements'
import screens from '../../screens/params/screens'
import { useState, useEffect } from 'react'

const FeedbackCard = (props: feedbackCardProps) => {
    const [image, setImage] = useState<string>('')

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        props.userAvatar !== image ? setImage(props.userAvatar) : null
    }, [props.userAvatar])

    const renderStars = () => {
        switch (props.rating) {
            case ratings.FIVE:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                    </>
                )
            case ratings.FOUR:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.SILVER}
                        />
                    </>
                )
            case ratings.THREE:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.SILVER}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.SILVER}
                        />
                    </>
                )
            case ratings.TWO:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.SILVER}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.SILVER}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.SILVER}
                        />
                    </>
                )
            case ratings.ONE:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.SILVER}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.SILVER}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.SILVER}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.SILVER}
                        />
                    </>
                )
            default:
                return null
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('User', {
                                userId: props.userId,
                            })
                        }
                    >
                        <Avatar
                            size="small"
                            rounded
                            source={
                                image
                                    ? { uri: image }
                                    : require('../../../assets/images/user-avatar.png')
                            }
                            containerStyle={styles.avatarContainer}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('User', {
                                userId: props.userId,
                            })
                        }
                    >
                        <Text
                            style={styles.userName}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {props.userName}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        Alert.alert(
                            `Report this feedback from ${props.userName}`,
                            'Report inappropriate or suspicious activity.',
                            [
                                {
                                    text: `Report`,

                                    onPress: () =>
                                        Linking.openURL(
                                            'mailto:support@dutified.com'
                                        ).catch(() => {
                                            Alert.alert(
                                                'Setup Email',
                                                'Please setup your email address on this device first.',
                                                [
                                                    {
                                                        text: 'Dismiss',
                                                        onPress: () => {},
                                                    },
                                                ]
                                            )
                                        }),
                                },
                                {
                                    text: 'Dismiss',
                                    onPress: () => {},
                                },
                            ]
                        )
                    }}
                >
                    <MaterialCommunityIcons
                        name="dots-vertical"
                        size={26}
                        color={themeColors.YELLOW_GREEN}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.feedbackTitle}>{props.feedbackTitle}</Text>
            <Text style={styles.feedback}>{props.feedback}</Text>
            <View style={styles.stars}>{renderStars()}</View>
            <Text style={styles.date}>{props.feedbackDate}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.WHITE,
        width: '90%',
        borderRadius: 20,
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        overflow: 'hidden',
        marginTop: '5%',
    },
    header: {
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
    },
    userName: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        justifyContent: 'flex-start',
        paddingLeft: '5%',
        paddingRight: '7%',
    },
    feedbackTitle: {
        paddingBottom: '5%',
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
    },
    feedback: {
        paddingBottom: '5%',
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
    },
    stars: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
        paddingBottom: '5%',
    },
    date: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.BLACK,
    },
})

export default FeedbackCard
