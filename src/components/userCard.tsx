import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements'
import { yellowGreen, silver, jet, platinum } from '../theme/colors'
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
                <Text style={styles.info}>4 projects</Text>
                <Text style={styles.info}>16 jobs</Text>
            </View>
            <View style={styles.stars}>
                <FontAwesome name="star" size={28} color={yellowGreen} />
                <FontAwesome name="star" size={28} color={yellowGreen} />
                <FontAwesome name="star" size={28} color={yellowGreen} />
                <FontAwesome name="star" size={28} color={yellowGreen} />
                <FontAwesome name="star" size={28} color={silver} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    profileSection: {
        backgroundColor: platinum,
        width: '90%',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 15,
    },
    avatarContainer: {
        backgroundColor: yellowGreen,
        marginTop: 20,
    },
    userName: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 24,
        color: jet,
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
        color: jet,
        backgroundColor: yellowGreen,
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
