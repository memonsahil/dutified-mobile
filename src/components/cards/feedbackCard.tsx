import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import navProps from '../types/navProps'
import feedbackCardProps from '../types/feedbackCardProps'
import ratings from '../../enums/ratings'

const FeedbackCard = (props: feedbackCardProps & navProps) => {
    const renderStars = () => {
        switch (props.rating) {
            case ratings.FIVE:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.AVACADO}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.AVACADO}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.AVACADO}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.AVACADO}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.AVACADO}
                        />
                    </>
                )
            case ratings.FOUR:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.AVACADO}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.AVACADO}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.AVACADO}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.AVACADO}
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
                            color={themeColors.AVACADO}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.AVACADO}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.AVACADO}
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
                            color={themeColors.AVACADO}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={themeColors.AVACADO}
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
                            color={themeColors.AVACADO}
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
            <TouchableOpacity
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
            <Text style={styles.feedback}>{props.feedback}</Text>
            <View style={styles.stars}>{renderStars()}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.PLATINUM,
        borderRadius: 15,
        width: '90%',
        overflow: 'hidden',
        marginBottom: 20,
    },
    userNameButton: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_THREE,
        color: themeColors.AVACADO,
        width: '100%',
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
    feedback: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 15,
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.WHITE,
    },
    stars: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 180,
        paddingLeft: 10,
        paddingBottom: 10,
    },
})

export default FeedbackCard
