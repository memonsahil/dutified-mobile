import { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../../screens/params/screens'
import transactionCardProps from '../props/transactionCardProps'
import { Avatar } from 'react-native-elements'

const TransactionCard = (props: transactionCardProps) => {
    const [payerImage, setPayerImage] = useState<string>('')
    const [payeeImage, setPayeeImage] = useState<string>('')

    const currentUserId = '1'

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Payer</Text>
            <View style={styles.interestWrapper}>
                <View style={styles.nameWrapper}>
                    <TouchableOpacity
                        onPress={() =>
                            props.payerId === currentUserId
                                ? navigation.navigate('Profile')
                                : navigation.navigate('User', {
                                      userId: props.payerId,
                                  })
                        }
                    >
                        <Avatar
                            size="small"
                            rounded
                            source={
                                payerImage
                                    ? { uri: payerImage }
                                    : require('../../../assets/images/user-avatar.png')
                            }
                            containerStyle={styles.avatarContainer}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.payerId === currentUserId
                                ? navigation.navigate('Profile')
                                : navigation.navigate('User', {
                                      userId: props.payerId,
                                  })
                        }}
                    >
                        <Text
                            style={styles.info}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {props.payerName}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.heading}>Payee</Text>
            <View style={styles.interestWrapper}>
                <View style={styles.nameWrapper}>
                    <TouchableOpacity
                        onPress={() =>
                            props.payeeId === currentUserId
                                ? navigation.navigate('Profile')
                                : navigation.navigate('User', {
                                      userId: props.payeeId,
                                  })
                        }
                    >
                        <Avatar
                            size="small"
                            rounded
                            source={
                                payeeImage
                                    ? { uri: payeeImage }
                                    : require('../../../assets/images/user-avatar.png')
                            }
                            containerStyle={styles.avatarContainer}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.payeeId === currentUserId
                                ? navigation.navigate('Profile')
                                : navigation.navigate('User', {
                                      userId: props.payeeId,
                                  })
                        }}
                    >
                        <Text
                            style={styles.info}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {props.payeeName}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.heading}>Amount</Text>
            <View style={styles.interestWrapper}>
                <Text
                    style={styles.info}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    USD {props.paymentAmount}
                </Text>
            </View>
            <Text style={styles.heading}>Job</Text>
            <View style={styles.interestWrapper}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Job', {
                            jobId: props.jobId,
                        })
                    }}
                >
                    <Text
                        style={styles.attachment}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {props.jobName}
                    </Text>
                </TouchableOpacity>
            </View>
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
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_THREE,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
    interestWrapper: {
        flexDirection: 'row',
        marginBottom: '5%',
    },
    nameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
        marginRight: '5%',
    },
    attachment: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.YELLOW_GREEN,
        marginBottom: '5%',
        textDecorationLine: 'underline',
    },
    info: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        paddingRight: '5%',
    },
    date: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.BLACK,
    },
})

export default TransactionCard
