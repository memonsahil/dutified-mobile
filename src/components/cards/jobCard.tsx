import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import navProps from '../props/navProps'
import jobCardProps from '../props/jobCardProps'

const JobCard = (props: jobCardProps & navProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() =>
                    props.nav.navigate('Job', { jobId: props.jobId })
                }
            >
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
                <Text
                    style={styles.jobDesc}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {props.description}
                </Text>
                <Text style={styles.jobDeadline}>{props.dueDate}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.WHITE,
        borderRadius: 20,
        width: '90%',
        height: '20%',
        marginBottom: '5%',
        paddingVertical: '3%',
        paddingHorizontal: '3%',
    },
    jobName: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        marginBottom: '3%',
    },
    detailSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '3%',
    },
    jobDetail: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.YELLOW_GREEN,
        padding: '1%',
        marginRight: '3%',
    },
    jobDesc: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        marginBottom: '3%',
        overflow: 'visible',
    },
    jobDeadline: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
    },
})

export default JobCard
