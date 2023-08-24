import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements'
import colors from '../enums/colors'
import userCardProps from '../types/props/components/userCardProps'

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
                        : require('../../assets/images/user-avatar.png')
                }
                containerStyle={styles.avatarContainer}
            />
            <Text
                style={styles.userName}
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {`${props.first} ${props.last}`}
            </Text>

            <View style={styles.infoSection}>
                <Text style={styles.info}>
                    {props.totalProjects === '0'
                        ? 'No Projects'
                        : `${props.totalProjects} Projects`}
                </Text>
                <Text style={styles.info}>
                    {props.totalJobs === '0'
                        ? 'No Jobs'
                        : `${props.totalJobs} Jobs`}
                </Text>
            </View>
            <View style={styles.stars}>
                <FontAwesome
                    name="star"
                    size={28}
                    color={colors.YELLOW_GREEN}
                />
                <FontAwesome
                    name="star"
                    size={28}
                    color={colors.YELLOW_GREEN}
                />
                <FontAwesome
                    name="star"
                    size={28}
                    color={colors.YELLOW_GREEN}
                />
                <FontAwesome
                    name="star"
                    size={28}
                    color={colors.YELLOW_GREEN}
                />
                <FontAwesome name="star" size={28} color={colors.SILVER} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileSection: {
        backgroundColor: colors.PLATINUM,
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 15,
    },
    avatarContainer: {
        backgroundColor: colors.YELLOW_GREEN,
        marginTop: 20,
    },
    userName: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 24,
        color: colors.JET,
        paddingTop: 15,
        paddingBottom: 20,
        width: 300,
        textAlign: 'center',
    },
    infoSection: {
        flexDirection: 'row',
        paddingBottom: 20,
    },
    info: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 15,
        color: colors.JET,
        backgroundColor: colors.YELLOW_GREEN,
        marginLeft: 10,
        padding: 5,
    },
    stars: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 180,
        paddingBottom: 20,
    },
})

export default UserCard
