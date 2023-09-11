import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import navProps from '../props/navProps'
import projectCardProps from '../props/projectCardProps'

const ProjectCard = (props: projectCardProps & navProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {}}>
                <Text
                    style={styles.projectName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {props.projectName}
                </Text>
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
        width: 350,
        height: 230,
        paddingVertical: 20,
        paddingHorizontal: 20,
        overflow: 'hidden',
        marginRight: 20,
    },
    projectName: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        marginBottom: '5%',
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
