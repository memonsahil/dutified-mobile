import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { jet, yellowGreen, platinum } from '../theme/colors'
import navProps from '../types/props/components/navProps'
import jobCardProps from '../types/props/components/jobCardProps'

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
        backgroundColor: platinum,
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
        fontSize: 18,
        color: jet,
        width: '60%',
    },
    detailSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobDetail: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 15,
        color: jet,
        backgroundColor: yellowGreen,
        marginLeft: 10,
        padding: 5,
    },
    jobDesc: {
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 16,
        color: jet,
        height: 50,
    },
    jobDeadline: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 18,
        color: jet,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
    },
})

export default JobCard
