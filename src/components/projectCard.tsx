import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../enums/colors'
import navProps from '../types/props/components/navProps'
import projectCardProps from '../types/props/components/projectCardProps'

const ProjectCard = (props: projectCardProps & navProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() =>
                    props.nav.navigate('Project', {
                        projectId: props.projectId,
                    })
                }
            >
                <Text
                    style={styles.projectName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {props.projectName}
                </Text>
                <Text
                    style={styles.projectCategory}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {props.category}
                </Text>
                <View style={styles.jobsSection}>
                    {props.availableJobs !== 0 || props.takenJobs !== 0 ? (
                        <>
                            {props.availableJobs !== 0 ? (
                                <Text style={styles.jobs}>
                                    {props.availableJobs} Available
                                </Text>
                            ) : null}
                            {props.takenJobs !== 0 ? (
                                <Text style={styles.jobs}>
                                    {props.takenJobs} Taken
                                </Text>
                            ) : null}
                        </>
                    ) : (
                        <Text style={styles.jobs}>No Jobs</Text>
                    )}
                </View>
                <Text
                    style={styles.projectDesc}
                    numberOfLines={4}
                    ellipsizeMode="tail"
                >
                    {props.projectDesc}
                </Text>
                <Text
                    style={styles.projectCreator}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {props.projectCreator}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PLATINUM,
        borderRadius: 15,
        marginLeft: 25,
        width: 325,
        overflow: 'hidden',
    },
    projectName: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 24,
        color: colors.JET,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    projectCategory: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 18,
        color: colors.JET,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
    },
    jobsSection: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },
    jobs: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 15,
        color: colors.JET,
        backgroundColor: colors.YELLOW_GREEN,
        marginLeft: 10,
        padding: 5,
    },
    projectDesc: {
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 16,
        color: colors.JET,
        height: 90,
    },
    projectCreator: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 18,
        color: colors.JET,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 10,
    },
})

export default ProjectCard
