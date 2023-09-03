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
                    <Text style={styles.jobDetail}>{props.category}</Text>
                </View>
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
                <Text style={styles.date}>{props.creationDate}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: themeColors.WHITE,
        borderRadius: 20,
        width: '90%',
        marginBottom: '5%',
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        overflow: 'hidden',
    },
    jobName: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
    detailSection: {
        flexDirection: 'row',
        marginBottom: '5%',
    },
    category: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.YELLOW_GREEN,
        padding: '1%',
    },
    jobDetail: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.YELLOW_GREEN,
        padding: '1%',
        marginRight: '5%',
    },
    jobDesc: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
    date: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.BLACK,
    },
})

export default JobCard
