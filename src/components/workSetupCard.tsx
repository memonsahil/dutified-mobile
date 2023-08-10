import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { black, green, white } from '../theme/colors'
import navProps from '../types/props/components/navProps'
import workSetupCardProps from '../types/props/components/workSetupCardProps'

const WorkSetupCard = (props: workSetupCardProps & navProps) => {
    const formattedDate = new Date().toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
    })

    return (
        <View style={styles.container}>
            <View style={styles.monthSection}>
                <Text style={styles.currentMonth}>{formattedDate}</Text>
                <TouchableOpacity
                    style={styles.options}
                    onPress={() => props.nav.navigate('WorkSetup')}
                >
                    <Feather name="edit-3" size={20} color="black" />
                </TouchableOpacity>
            </View>
            {props.preferredCategories.length !== 0 &&
            props.totalJobs !== '' ? (
                <>
                    <View style={styles.infoSection}>
                        <Text style={styles.heading}>Preferred Categories</Text>
                    </View>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categories}
                    >
                        {Object.values(props.preferredCategories).map(
                            (category) => (
                                <TouchableOpacity
                                    key={category}
                                    onPress={() => {}}
                                >
                                    <Text style={styles.detail}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            )
                        )}
                    </ScrollView>
                    <View style={styles.infoSection}>
                        <Text style={styles.heading}>Total Jobs</Text>
                        <View style={styles.detailSection}>
                            <Text style={styles.detail}>{props.totalJobs}</Text>
                        </View>
                    </View>
                </>
            ) : (
                <Text style={styles.info}>
                    Setup your preferences to find jobs for this month.
                </Text>
            )}
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
        paddingBottom: 10,
    },
    monthSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    currentMonth: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 24,
        color: black,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
    },
    options: {
        backgroundColor: green,
        padding: 5,
        alignSelf: 'center',
    },
    infoSection: {
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    heading: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 18,
        color: black,
        width: 200,
    },
    detailSection: {
        flexDirection: 'row',
        marginTop: 10,
    },
    detail: {
        fontFamily: 'IBMPlexSans-Bold',
        fontSize: 15,
        color: black,
        backgroundColor: green,
        padding: 5,
        marginRight: 10,
        marginBottom: 10,
    },
    categories: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    info: {
        fontFamily: 'IBMPlexSans-Regular',
        fontSize: 16,
        color: black,
        padding: 20,
        alignSelf: 'center',
    },
})

export default WorkSetupCard
