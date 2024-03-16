import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import fontSizes from '../../enums/fontSizes'
import themeColors from '../../enums/themeColors'
import userDetailsCardProps from '../props/userDetailsCardProps'

const UserDetailsCard = (props: userDetailsCardProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Bio</Text>
            {props.description !== '' ? (
                <Text style={styles.description}>{props.description}</Text>
            ) : (
                <Text style={styles.description}>No bio.</Text>
            )}
            <Text style={styles.heading}>Rate/Day</Text>
            {props.dailyRate !== '' ? (
                <View style={styles.interestWrapper}>
                    <Text
                        style={styles.interest}
                    >{`$${props.dailyRate}/Day`}</Text>
                </View>
            ) : (
                <Text style={styles.description}>No rate.</Text>
            )}
            <Text style={styles.heading}>Interests</Text>
            {props.interests?.length !== 0 ? (
                props.interests?.map((interest) => (
                    <View style={styles.interestWrapper} key={interest}>
                        <Text style={styles.interest}>{interest}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.description}>No interests.</Text>
            )}

            <Text style={styles.heading}>Links</Text>
            {props.links?.length !== 0 ? (
                props.links?.map((link) => (
                    <View style={styles.interestWrapper} key={link}>
                        <TouchableOpacity onPress={() => Linking.openURL(link)}>
                            <Text
                                style={styles.link}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {link}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text style={styles.description}>No links.</Text>
            )}
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
        paddingTop: '5%',
        overflow: 'hidden',
        marginTop: '5%',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
    interestWrapper: {
        flexDirection: 'row',
        marginBottom: '5%',
    },
    interest: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.GREEN,
        padding: '1%',
    },
    description: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
    link: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        textDecorationLine: 'underline',
    },
})

export default UserDetailsCard
