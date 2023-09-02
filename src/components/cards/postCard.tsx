import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import postCardProps from '../props/postCardProps'
import { Avatar } from 'react-native-elements'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'

const postCard = (props: postCardProps) => {
    const [image, setImage] = useState<string>('')

    useEffect(() => {
        props.image !== image ? setImage(props.image) : null
    }, [props.image])

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
            <Text style={styles.post}>{props.post}</Text>
            <Text style={styles.date}>{props.postDate}</Text>
            <View style={styles.border} />
            <View style={styles.postFooter}>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.button}>Like</Text>
                </TouchableOpacity>
                <View style={styles.buttonDivider} />
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.button}>Comment</Text>
                </TouchableOpacity>
                <View style={styles.buttonDivider} />
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.button}>Share</Text>
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
        marginBottom: '5%',
    },
    date: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_THREE,
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
    buttonDivider: {
        height: '100%',
        borderBottomColor: themeColors.BLACK,
        borderWidth: 1,
        marginBottom: '5%',
        flexDirection: 'column',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.YELLOW_GREEN,
    },
})

export default postCard
