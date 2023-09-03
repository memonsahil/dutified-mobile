import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import postCardProps from '../props/postCardProps'
import { Avatar } from 'react-native-elements'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'

const PostCard = (props: postCardProps) => {
    const [image, setImage] = useState<string>('')

    useEffect(() => {
        props.userAvatar !== image ? setImage(props.userAvatar) : null
    }, [props.userAvatar])

    return (
        <View style={styles.container}>
            <View style={styles.postHeader}>
                <Avatar
                    size="small"
                    rounded
                    source={
                        image
                            ? { uri: image }
                            : require('../../../assets/images/user-avatar.png')
                    }
                    containerStyle={styles.avatarContainer}
                />
                <Text
                    style={styles.userName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {props.userName}
                </Text>
            </View>
            <Text style={styles.post}>{props.content}</Text>
            <Text style={styles.date}>{props.date}</Text>
            <View style={styles.border} />
            <View style={styles.postFooter}>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.button}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.button}>Comment (200)</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.WHITE,
        width: '90%',
        borderRadius: 20,
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        overflow: 'hidden',
        marginBottom: '5%',
    },
    postHeader: {
        marginBottom: '5%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
    },
    userName: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        textAlign: 'center',
        paddingLeft: '5%',
    },
    post: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
    date: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
    border: {
        width: '100%',
        borderBottomColor: themeColors.BLACK,
        borderWidth: 1,
        marginBottom: '5%',
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.YELLOW_GREEN,
    },
})

export default PostCard
