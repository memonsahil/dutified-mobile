import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import useAuthUserStore from '../stores/useAuthUserStore'
import FeedbackCard from '../components/feedbackCard'
import { AntDesign } from '@expo/vector-icons'
import { raisinBlack, yellowGreen, platinum } from '../theme/colors'
import screens from '../types/params/screens'

const FeedbackScreen = () => {
    const { feedbacks } = useAuthUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign
                            name="caretleft"
                            size={30}
                            color={yellowGreen}
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
                                    feedback={feedback.feedback}
                                    rating={feedback.rating}
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
        backgroundColor: raisinBlack,
    },
    scrollView: {
        alignItems: 'center',
        paddingBottom: '20%',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 30,
        color: platinum,
        paddingLeft: 20,
        paddingRight: 30,
    },
    feedbackList: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 18,
        color: platinum,
        textAlign: 'center',
    },
})

export default FeedbackScreen
