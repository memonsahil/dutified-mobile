import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { black, green, white } from '../theme/colors'
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
        backgroundColor: white,
        borderRadius: 5,
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
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: black,
    },
    detailSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobDetail: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: black,
        backgroundColor: green,
        marginLeft: 10,
        padding: 5,
    },
    jobDesc: {
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: black,
        height: 50,
    },
    jobDeadline: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 18,
        color: black,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
    },
})

export default JobCard
