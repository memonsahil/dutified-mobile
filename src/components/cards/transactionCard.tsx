import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../../screens/params/screens'
import transactionCardProps from '../props/transactionCardProps'

const TransactionCard = (props: transactionCardProps) => {
    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Job', {
                        jobId: props.jobId,
                    })
                }}
            >
                <Text style={styles.attachment}>{props.jobName}</Text>
            </TouchableOpacity>
            <Text style={styles.date}>{props.paymentDate}</Text>
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
    attachment: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.YELLOW_GREEN,
        marginBottom: '5%',
        textDecorationLine: 'underline',
    },
    date: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
})

export default TransactionCard
