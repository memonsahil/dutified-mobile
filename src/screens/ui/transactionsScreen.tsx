import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import TransactionCard from '../../components/cards/transactionCard'
import * as Crypto from 'expo-crypto'
import transactionCardProps from '../../components/props/transactionCardProps'

const TransactionsScreen = () => {
    const transactions: transactionCardProps[] = [
        {
            paymentId: Crypto.randomUUID(),
            paymentAmount: '1000000000000000000000000000000000',
            payerId: Crypto.randomUUID(),
            payerName: 'A very very very long name that will cut off',
            payeeId: Crypto.randomUUID(),
            payeeName: 'Jane Doe',
            jobId: Crypto.randomUUID(),
            jobName: 'A very very very long job name that will be cut off',
            projectId: Crypto.randomUUID(),
            projectName: 'Project 1',
            paymentDate: '2021-01-01',
        },
        {
            paymentId: Crypto.randomUUID(),
            paymentAmount: '100',
            payerId: Crypto.randomUUID(),
            payerName: 'John Doe',
            payeeId: Crypto.randomUUID(),
            payeeName: 'Jane Doe',
            jobId: Crypto.randomUUID(),
            jobName: 'Job 1',
            projectId: Crypto.randomUUID(),
            projectName: 'Project 1',
            paymentDate: '2021-01-01',
        },
        {
            paymentId: Crypto.randomUUID(),
            paymentAmount: '100',
            payerId: Crypto.randomUUID(),
            payerName: 'John Doe',
            payeeId: Crypto.randomUUID(),
            payeeName: 'Jane Doe',
            jobId: Crypto.randomUUID(),
            jobName: 'Job 1',
            projectId: Crypto.randomUUID(),
            projectName: 'Project 1',
            paymentDate: '2021-01-01',
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
                    <Text style={styles.heading}>Transactions</Text>
                </View>
                <View style={styles.usersList}>
                    {transactions.length !== 0 ? (
                        <>
                            {transactions.map((transaction) => (
                                <TransactionCard
                                    paymentId={transaction.paymentId}
                                    paymentAmount={transaction.paymentAmount}
                                    payerId={transaction.payerId}
                                    payerName={transaction.payerName}
                                    payeeId={transaction.payeeId}
                                    payeeName={transaction.payeeName}
                                    jobId={transaction.jobId}
                                    jobName={transaction.jobName}
                                    projectId={transaction.projectId}
                                    projectName={transaction.projectName}
                                    paymentDate={transaction.paymentDate}
                                />
                            ))}
                        </>
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>
                                Payments that you make or recieve will be shown
                                here.
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
    usersList: {
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

export default TransactionsScreen
