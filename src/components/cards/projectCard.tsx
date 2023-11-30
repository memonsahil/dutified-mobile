import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import navProps from '../props/navProps'
import projectCardProps from '../props/projectCardProps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import globalStore from '../../state/stores/globalStore'
import attachment from '../../enums/attachment'

const ProjectCard = (props: projectCardProps & navProps) => {
    const { setSelectedAttachments, selectedAttachments } = globalStore(
        (state) => state
    )

    return (
        <View style={[styles.container, props.additionalStyle]}>
            <TouchableOpacity onPress={() => {}}>
                <Text
                    style={styles.projectName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {props.projectName}
                </Text>
                {props.showPlus ? (
                    <TouchableOpacity
                        onPress={() => {
                            selectedAttachments.some(
                                (_attachment) =>
                                    _attachment.id === props.projectId &&
                                    _attachment.title === props.projectName &&
                                    _attachment.type === attachment.PROJECT
                            )
                                ? setSelectedAttachments(
                                      selectedAttachments.filter(
                                          (_attachment) =>
                                              _attachment.id !== props.projectId
                                      )
                                  )
                                : setSelectedAttachments([
                                      ...selectedAttachments,
                                      {
                                          id: props.projectId,
                                          title: props.projectName,
                                          type: attachment.PROJECT,
                                      },
                                  ])
                        }}
                        style={styles.plusIcon}
                    >
                        {selectedAttachments.some(
                            (_attachment) =>
                                _attachment.id === props.projectId &&
                                _attachment.title === props.projectName &&
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
                    <Text style={styles.projectDetail}>{props.category}</Text>
                </View>
                <View style={styles.infoSection}>
                    <Text
                        style={styles.projectDesc}
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
        paddingVertical: 20,
        paddingHorizontal: 20,
        overflow: 'hidden',
    },
    projectName: {
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
    category: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.YELLOW_GREEN,
        padding: '1%',
    },
    projectDetail: {
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
    projectDesc: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
    },
    date: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.BLACK,
    },
})

export default ProjectCard
