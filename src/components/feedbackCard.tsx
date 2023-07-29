import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { black, green, white, gray } from '../theme/colors'
import navProps from '../types/props/components/navProps'
import feedbackCardProps from '../types/props/components/feedbackCardProps'
import ratings from '../enums/ratings'

const FeedbackCard = (props: feedbackCardProps & navProps) => {
    const renderStars = () => {
        switch (props.rating) {
            case ratings.five:
                return (
                    <>
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={green} />
                    </>
                )
            case ratings.four:
                return (
                    <>
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={gray} />
                    </>
                )
            case ratings.three:
                return (
                    <>
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={gray} />
                        <FontAwesome name="star" size={26} color={gray} />
                    </>
                )
            case ratings.two:
                return (
                    <>
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={gray} />
                        <FontAwesome name="star" size={26} color={gray} />
                        <FontAwesome name="star" size={26} color={gray} />
                    </>
                )
            case ratings.one:
                return (
                    <>
                        <FontAwesome name="star" size={26} color={green} />
                        <FontAwesome name="star" size={26} color={gray} />
                        <FontAwesome name="star" size={26} color={gray} />
                        <FontAwesome name="star" size={26} color={gray} />
                        <FontAwesome name="star" size={26} color={gray} />
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
        backgroundColor: white,
        borderRadius: 5,
        width: '90%',
        overflow: 'hidden',
        marginBottom: 20,
    },
    userNameButton: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 24,
        color: green,
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
        fontFamily: 'IBMPlexSans-Regular',
        fontSize: 16,
        color: black,
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
