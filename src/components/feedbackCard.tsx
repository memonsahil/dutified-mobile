import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { jet, yellowGreen, platinum, silver } from '../theme/colors'
import navProps from '../types/props/components/navProps'
import feedbackCardProps from '../types/props/components/feedbackCardProps'
import ratings from '../enums/ratings'

const FeedbackCard = (props: feedbackCardProps & navProps) => {
    const renderStars = () => {
        switch (props.rating) {
            case ratings.five:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                    </>
                )
            case ratings.four:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome name="star" size={26} color={silver} />
                    </>
                )
            case ratings.three:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome name="star" size={26} color={silver} />
                        <FontAwesome name="star" size={26} color={silver} />
                    </>
                )
            case ratings.two:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome name="star" size={26} color={silver} />
                        <FontAwesome name="star" size={26} color={silver} />
                        <FontAwesome name="star" size={26} color={silver} />
                    </>
                )
            case ratings.one:
                return (
                    <>
                        <FontAwesome
                            name="star"
                            size={26}
                            color={yellowGreen}
                        />
                        <FontAwesome name="star" size={26} color={silver} />
                        <FontAwesome name="star" size={26} color={silver} />
                        <FontAwesome name="star" size={26} color={silver} />
                        <FontAwesome name="star" size={26} color={silver} />
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
        backgroundColor: platinum,
        borderRadius: 15,
        width: '90%',
        overflow: 'hidden',
        marginBottom: 20,
    },
    userNameButton: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 24,
        color: yellowGreen,
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
        fontSize: 16,
        color: jet,
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
