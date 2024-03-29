import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import userCardProps from '../props/userCardProps'

const UserCard = (props: userCardProps) => {
    const [image, setImage] = useState<string>('')

    useEffect(() => {
        props.image !== image ? setImage(props.image) : null
    }, [props.image])

    return (
        <View style={styles.profileSection}>
            <Avatar
                size="large"
                rounded
                source={
                    image
                        ? { uri: image }
                        : require('../../../assets/images/user-avatar.png')
                }
                containerStyle={styles.avatarContainer}
            />
            <Text style={styles.userName}>
                {`${props.first} ${props.last}`}
            </Text>
            {parseInt(props.avgRating) === 1 ? (
                <View style={styles.stars}>
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.SILVER}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.SILVER}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.SILVER}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.SILVER}
                    />
                </View>
            ) : parseInt(props.avgRating) === 2 ? (
                <View style={styles.stars}>
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.SILVER}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.SILVER}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.SILVER}
                    />
                </View>
            ) : parseInt(props.avgRating) === 3 ? (
                <View style={styles.stars}>
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.SILVER}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.SILVER}
                    />
                </View>
            ) : parseInt(props.avgRating) === 4 ? (
                <View style={styles.stars}>
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.SILVER}
                    />
                </View>
            ) : parseInt(props.avgRating) === 5 ? (
                <View style={styles.stars}>
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                    <FontAwesome
                        name="star"
                        size={28}
                        color={themeColors.GREEN}
                    />
                </View>
            ) : (
                <Text style={styles.infoRight}>No Ratings Yet</Text>
            )}
            <View style={styles.infoSection}>
                <Text style={styles.infoLeft}>
                    {`Projects Created: ${props.projectsCreated}`}
                </Text>
                <Text style={styles.infoRight}>
                    {`Jobs Created: ${props.jobsCreated}`}
                </Text>
            </View>
            <View style={styles.infoSection}>
                <Text style={styles.infoLeft}>
                    {`Projects Worked: ${props.projectsWorked}`}
                </Text>
                <Text style={styles.infoRight}>
                    {`Jobs Worked: ${props.jobsWorked}`}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileSection: {
        backgroundColor: themeColors.WHITE,
        width: '90%',
        alignItems: 'center',
        marginTop: '5%',
        borderRadius: 20,
        paddingVertical: '5%',
        overflow: 'hidden',
    },
    avatarContainer: {
        backgroundColor: themeColors.GREEN,
        marginBottom: '5%',
    },
    userName: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        textAlign: 'center',
        paddingHorizontal: '5%',
    },
    stars: {
        flexDirection: 'row',
        paddingTop: '5%',
        justifyContent: 'space-between',
        width: '45%',
    },
    infoSection: {
        flexDirection: 'row',
    },
    infoLeft: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.GREEN,
        padding: '1%',
        marginRight: '5%',
        marginTop: '5%',
    },
    infoRight: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.GREEN,
        padding: '1%',
        marginTop: '5%',
    },
})

export default UserCard
