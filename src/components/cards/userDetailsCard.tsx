import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import fontSizes from '../../enums/fontSizes'
import themeColors from '../../enums/themeColors'
import userDetailsCardProps from '../props/userDetailsCardProps'

const UserDetailsCard = (props: userDetailsCardProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Bio</Text>
            <Text style={styles.description}>{props.description}</Text>
            <Text style={styles.heading}>Interests</Text>
            {props.interests.map((interest) => (
                <View style={styles.interestWrapper} key={interest}>
                    <Text style={styles.interest}>{interest}</Text>
                </View>
            ))}
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
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        marginBottom: '5%',
    },
    interestWrapper: {
        flexDirection: 'row',
        marginBottom: '5%',
    },
    interest: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.YELLOW_GREEN,
        padding: '1%',
    },
    description: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_TWO,
        marginBottom: '5%',
    },
})

export default UserDetailsCard
