import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import navProps from '../types/navProps'
import jobCardProps from '../types/jobCardProps'

const JobCard = (props: jobCardProps & navProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() =>
                    props.nav.navigate('Job', { jobId: props.jobId })
                }
            >
                <View style={styles.jobInfoSection}>
                    <Text
                        style={styles.jobName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {props.jobName}
                    </Text>
                    <View style={styles.detailSection}>
                        <Text style={styles.jobDetail}>${props.payment}</Text>
                        <Text style={styles.jobDetail}>{props.status}</Text>
                    </View>
                </View>
                <Text
                    style={styles.jobDesc}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {props.jobDesc}
                </Text>
                <Text style={styles.jobDeadline}>{props.deadline}</Text>
            </TouchableOpacity>
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
    jobInfoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    jobName: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        width: '60%',
    },
    detailSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobDetail: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.WHITE,
        backgroundColor: themeColors.AVACADO,
        marginLeft: 10,
        padding: 5,
    },
    jobDesc: {
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.WHITE,
        height: 50,
    },
    jobDeadline: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
    },
})

export default JobCard
