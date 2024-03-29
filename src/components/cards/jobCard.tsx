import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import jobCardProps from '../props/jobCardProps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import utilStore from '../../state/stores/utilStore'
import attachment from '../../enums/attachments'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import screens from '../../screens/params/screens'
import selection from '../../enums/selections'

const JobCard = (props: jobCardProps) => {
    const {
        selectedAttachments,
        setSelectedAttachments,
        setShowAgreementModal,
        setShowJobModal,
        setSelectedJob,
    } = utilStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={[styles.container, props.additionalStyle]}>
            <TouchableOpacity
                onPress={() => {
                    props.showPlus === selection.AGREEMENT ||
                    props.showPlus === selection.SELECTED
                        ? (setShowAgreementModal(false), setShowJobModal(true))
                        : navigation.navigate('Job', { jobId: props.jobId })
                }}
            >
                <Text
                    style={[
                        styles.jobName,
                        {
                            width:
                                props.showPlus !== selection.HIDE &&
                                props.showPlus !== selection.SELECTED
                                    ? '85%'
                                    : '100%',
                        },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {props.jobName}
                </Text>
                {props.showPlus === selection.ATTACHMENT ? (
                    <TouchableOpacity
                        onPress={() => {
                            selectedAttachments.some(
                                (_attachment) =>
                                    _attachment.id === props.jobId &&
                                    _attachment.title === props.jobName &&
                                    _attachment.type === attachment.JOB
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
                                          type: attachment.JOB,
                                      },
                                  ])
                        }}
                        style={styles.plusIcon}
                    >
                        {selectedAttachments.some(
                            (_attachment) =>
                                _attachment.id === props.jobId &&
                                _attachment.title === props.jobName &&
                                _attachment.type === attachment.JOB
                        ) ? (
                            <MaterialCommunityIcons
                                name="close-circle"
                                size={28}
                                color={themeColors.SILVER}
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name="plus-circle"
                                size={28}
                                color={themeColors.GREEN}
                            />
                        )}
                    </TouchableOpacity>
                ) : props.showPlus === selection.AGREEMENT ? (
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedJob({
                                jobId: props.jobId,
                                jobName: props.jobName,
                                status: props.status,
                                payment: props.payment,
                                description: props.description,
                                creationDate: props.creationDate,
                                category: props.category,
                                showPlus: props.showPlus,
                            })
                        }}
                        style={styles.plusIcon}
                    >
                        <MaterialCommunityIcons
                            name="plus-circle"
                            size={28}
                            color={themeColors.GREEN}
                        />
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
        paddingVertical: 20,
        paddingHorizontal: 20,
        overflow: 'hidden',
    },
    jobName: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        marginBottom: '5%',
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
    jobDetail: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.GREEN,
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
