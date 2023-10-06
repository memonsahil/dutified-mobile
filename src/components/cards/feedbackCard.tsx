import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import navProps from '../props/navProps'
import feedbackCardProps from '../props/feedbackCardProps'
import ratings from '../../enums/ratings'
import * as MailComposer from 'expo-mail-composer'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const FeedbackCard = (props: feedbackCardProps & navProps) => {
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
                <TouchableOpacity
                    style={styles.userNameButtonWrapper}
                    onPress={() =>
                        props.nav.navigate('User', {
                            userId: props.userId,
                        })
                    }
                >
                    <Text
                        style={styles.userNameButton}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {props.userName}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        Alert.alert(
                            'Report Feedback',
                            'Report incorrect or inappropriate feedback.',
                            [
                                {
                                    text: `Report`,

                                    onPress: () =>
                                        MailComposer.composeAsync({
                                            recipients: [
                                                'support@dutified.com',
                                            ],
                                        }).catch(() => {
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
                    }
                >
                    <MaterialCommunityIcons
                        name="dots-vertical"
                        size={24}
                        color={themeColors.BLACK}
                    />
                </TouchableOpacity>
            </View>
            <Text
                style={styles.feedbackTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {props.feedbackTitle}
            </Text>
            <Text style={styles.feedback}>{props.feedback}</Text>
            <View style={styles.stars}>{renderStars()}</View>
            <Text style={styles.date}>{props.feedbackDate}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        backgroundColor: themeColors.WHITE,
        width: '90%',
        marginBottom: '5%',
        borderRadius: 20,
        paddingTop: '5%',
        paddingHorizontal: '5%',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: '5%',
        alignItems: 'center',
    },
    userNameButtonWrapper: {
        width: '90%',
    },
    userNameButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_THREE,
        color: themeColors.YELLOW_GREEN,
    },
    feedbackTitle: {
        paddingBottom: '5%',
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
    },
    feedback: {
        paddingBottom: '5%',
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
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
        marginBottom: '5%',
    },
})

export default FeedbackCard
