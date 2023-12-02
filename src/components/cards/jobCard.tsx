import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import jobCardProps from '../props/jobCardProps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import globalStore from '../../state/stores/globalStore'
import attachment from '../../enums/attachment'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import screens from '../../screens/params/screens'

const JobCard = (props: jobCardProps) => {
    const { setSelectedAttachments, selectedAttachments } = globalStore(
        (state) => state
    )

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('Job', { jobId: props.jobId })
                }
            >
                <Text
                    style={[
                        styles.jobName,
                        { width: props.showPlus ? '85%' : '100%' },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {props.jobName}
                </Text>
                {props.showPlus ? (
                    <TouchableOpacity
                        onPress={() => {
                            selectedAttachments.some(
                                (_attachment) =>
                                    _attachment.id === props.jobId &&
                                    _attachment.title === props.jobName &&
                                    _attachment.type === attachment.PROJECT
                            )
                                ? setSelectedAttachments(
                                      selectedAttachments.filter(
                                          (_attachment) =>
                                              _attachment.id !== props.jobId
                                      )
                                  )
                                : setSelectedAttachments([
                                      ...selectedAttachments,
                                      {
                                          id: props.jobId,
                                          title: props.jobName,
                                          type: attachment.PROJECT,
                                      },
                                  ])
                        }}
                        style={styles.plusIcon}
                    >
                        {selectedAttachments.some(
                            (_attachment) =>
                                _attachment.id === props.jobId &&
                                _attachment.title === props.jobName &&
                                _attachment.type === attachment.PROJECT
                        ) ? (
                            <MaterialCommunityIcons
                                name="close-circle"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name="plus-circle"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        )}
                    </TouchableOpacity>
                ) : null}
                <View style={styles.detailSection}>
                    <Text style={styles.jobDetail}>{props.category}</Text>
                </View>
                <View style={styles.detailSection}>
                    <Text style={styles.jobDetail}>${props.payment}</Text>
                    <Text style={styles.jobDetail}>{props.status}</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text
                        style={styles.jobDesc}
                        numberOfLines={3}
                        ellipsizeMode="tail"
                    >
                        {props.description}
                    </Text>
                    <Text style={styles.date}>{props.creationDate}</Text>
                </View>
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
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        marginBottom: '5%',
        width: '90%',
    },
    plusIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    detailSection: {
        flexDirection: 'row',
        marginBottom: '5%',
    },
    category: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.YELLOW_GREEN,
        padding: '1%',
    },
    jobDetail: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.YELLOW_GREEN,
        padding: '1%',
        marginRight: '5%',
    },
    infoSection: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 100,
    },
    jobDesc: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
    date: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.BLACK,
    },
})

export default JobCard
