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
import feedbackType from '../../data/types/feedbackType'

const FeedbackScreen = () => {
    const feedbacks: feedbackType[] = [
        {
            feedbackId: '1',
            userId: '1',
            userName: 'Sahil Memon',
            userImage: '',
            feedbackTitle: 'Feedback Title',
            feedback:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            rating: '4',
            feedbackDate: '2021-01-01',
        },
        {
            feedbackId: '2',
            userId: '2',
            userName: 'Sahil Memon',
            userImage: '',
            feedbackTitle: 'Feedback Title',
            feedback:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget ali quam, sit ame sit ame.',
            rating: '2',
            feedbackDate: '2021-01-01',
        },
        {
            feedbackId: '3',
            userId: '3',
            userName: 'Sahil Memon',
            userImage: '',
            feedbackTitle: 'Feedback Title',
            feedback:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            rating: '3',
            feedbackDate: '2021-01-01',
        },
        {
            feedbackId: '4',
            userId: '4',
            userName: 'Sahil Memon',
            userImage: '',
            feedbackTitle: 'Feedback Title',
            feedback:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            rating: '0',
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
                            size={26}
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
                                    userId={feedback.userId}
                                    userName={feedback.userName}
                                    userImage={feedback.userImage}
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
                                You have not received any feedbacks yet.
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
        textAlign: 'center',
    },
})

export default FeedbackScreen
