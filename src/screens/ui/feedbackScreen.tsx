import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import FeedbackCard from '../../components/cards/feedbackCard'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import feedbackCardProps from '../../components/props/feedbackCardProps'
import ratings from '../../enums/ratings'

const FeedbackScreen = () => {
    const feedbacks: feedbackCardProps[] = [
        {
            feedbackId: '1',
            userId: '1',
            userName: 'Sahil Memon',
            feedbackTitle: 'Title',
            feedback: 'This is a feedback',
            rating: ratings.FIVE,
            feedbackDate: '2021-01-01',
        },
        {
            feedbackId: '2',
            userId: '2',
            userName: 'Sahil Memon',
            feedbackTitle: 'Title',
            feedback: 'This is a feedback',
            rating: ratings.FOUR,
            feedbackDate: '2021-01-01',
        },
        {
            feedbackId: '3',
            userId: '3',
            userName: 'Sahil Memon',
            feedbackTitle: 'Title',
            feedback: 'This is a feedback',
            rating: ratings.THREE,
            feedbackDate: '2021-01-01',
        },
        {
            feedbackId: '4',
            userId: '4',
            userName: 'Sahil Memon',
            feedbackTitle: 'Title',
            feedback: 'This is a feedback',
            rating: ratings.TWO,
            feedbackDate: '2021-01-01',
        },
        {
            feedbackId: '5',
            userId: '5',
            userName: 'Sahil Memon',
            feedbackTitle: 'Title',
            feedback: 'This is a feedback',
            rating: ratings.ONE,
            feedbackDate: '2021-01-01',
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
                    <Text style={styles.heading}>Feedback</Text>
                </View>
                <View style={styles.feedbackList}>
                    {feedbacks.length !== 0 ? (
                        <>
                            {feedbacks.map((feedback) => (
                                <FeedbackCard
                                    key={feedback.feedbackId}
                                    nav={navigation}
                                    userId={feedback.userId}
                                    userName={feedback.userName}
                                    feedbackId={feedback.feedbackId}
                                    feedbackTitle={feedback.feedbackTitle}
                                    feedback={feedback.feedback}
                                    rating={feedback.rating}
                                    feedbackDate={feedback.feedbackDate}
                                />
                            ))}
                        </>
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>
                                No feedbacks yet.
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
    feedbackList: {
        width: '100%',
        alignItems: 'center',
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingTop: '10%',
        paddingBottom: '10%',
        textAlign: 'center',
    },
})

export default FeedbackScreen
