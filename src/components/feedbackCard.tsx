import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import colors from '../enums/colors'
import fonts from '../enums/fonts'
import navProps from '../types/props/components/navProps'
import feedbackCardProps from '../types/props/components/feedbackCardProps'
import ratings from '../enums/ratings'

const FeedbackCard = (props: feedbackCardProps & navProps) => {
    const renderStars = () => {
        switch (props.rating) {
            case ratings.FIVE:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                    </>
                )
            case ratings.FOUR:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.SILVER}
                        />
                    </>
                )
            case ratings.THREE:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.SILVER}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.SILVER}
                        />
                    </>
                )
            case ratings.TWO:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.SILVER}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.SILVER}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.SILVER}
                        />
                    </>
                )
            case ratings.ONE:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.YELLOW_GREEN}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.SILVER}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.SILVER}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.SILVER}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={colors.SILVER}
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
        backgroundColor: colors.PLATINUM,
        borderRadius: 15,
        width: '90%',
        overflow: 'hidden',
        marginBottom: 20,
    },
    userNameButton: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.HEADING_THREE,
        color: colors.YELLOW_GREEN,
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
        fontSize: fonts.BODY_TWO,
        color: colors.JET,
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
