import { JSX } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements'
import themeColors from '../../enums/themeColors'
import screens from '../params/screens'
import { s, vs, ms, mvs } from 'react-native-size-matters'
import Carousel from 'react-native-snap-carousel'
import fontSizes from '../../enums/fontSizes'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const MainScreen = () => {
    const navigation: NavigationProp<screens> = useNavigation()

    const carouselItems: {
        content: JSX.Element
    }[] = [
        {
            content: (
                <>
                    <Text style={styles.title}>Dutified.</Text>
                    <Image
                        source={require('../../../assets/images/info-one.png')}
                        style={{
                            width: ms(210),
                            height: mvs(270),
                        }}
                    />
                    <Text style={styles.body}>
                        Dutified exists to empower you to design, develop, and
                        discover new ideas.
                    </Text>
                </>
            ),
        },
        {
            content: (
                <>
                    <Text style={styles.heading}>1. Design</Text>
                    <Image
                        source={require('../../../assets/images/info-two.png')}
                        style={{
                            width: ms(210),
                            height: mvs(270),
                        }}
                    />
                    <Text style={styles.body}>
                        Use AI to imagine your idea, plan your project, and
                        setup your crowdfunding goal.
                    </Text>
                </>
            ),
        },
        {
            content: (
                <>
                    <Text style={styles.heading}>2. Develop</Text>
                    <Image
                        source={require('../../../assets/images/info-three.png')}
                        style={{
                            width: ms(180),
                            height: mvs(290),
                        }}
                    />
                    <Text style={styles.body}>
                        Use AI to divide your project into achievable jobs and
                        hire others to join your team.
                    </Text>
                </>
            ),
        },
        {
            content: (
                <>
                    <Text style={styles.heading}>3. Discover</Text>
                    <Image
                        source={require('../../../assets/images/info-four.png')}
                        style={{
                            width: ms(180),
                            height: mvs(300),
                        }}
                    />
                    <Text style={styles.body}>
                        Share your progress, crowdfund your project, and get
                        feedback from early enthusiasts.
                    </Text>
                </>
            ),
        },
        {
            content: (
                <>
                    <Text style={styles.title}>Dutified.</Text>
                    <View style={styles.mainSection}>
                        <TouchableOpacity
                            style={styles.buttonWrapper}
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            <MaterialCommunityIcons
                                name="account"
                                size={28}
                                color={themeColors.GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.button}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonWrapper}
                            onPress={() => navigation.navigate('SignIn')}
                        >
                            <MaterialCommunityIcons
                                name="login"
                                size={28}
                                color={themeColors.GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.button}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonWrapper}
                            onPress={() => navigation.navigate('Support')}
                        >
                            <MaterialCommunityIcons
                                name="help-circle"
                                size={28}
                                color={themeColors.GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.button}>Support</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>1.0.0</Text>
                    </View>
                    <Text style={styles.body}>
                        The best place to design, develop, and discover new
                        ideas.
                    </Text>
                </>
            ),
        },
    ]

    const infoCard = ({ item }: { item: { content: JSX.Element } }) => {
        return <View style={styles.infoCard}>{item.content}</View>
    }

    return (
        <View style={styles.container}>
            <Carousel
                layout={'default'}
                data={carouselItems}
                sliderWidth={s(350)}
                itemWidth={s(300)}
                renderItem={infoCard}
                snapToAlignment={'center'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.MINT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoCard: {
        backgroundColor: themeColors.WHITE,
        borderRadius: 20,
        width: s(300),
        height: vs(575),
        marginTop: vs(60),
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: s(20),
        overflow: 'hidden',
    },
    title: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.BLACK,
    },
    heading: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.BLACK,
    },
    body: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        textAlign: 'center',
    },
    mainSection: {
        height: vs(200),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonWrapper: {
        flexDirection: 'row',
    },
    iconButton: {
        marginRight: s(10),
    },
    button: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.GREEN,
    },
    text: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.BLACK,
    },
})

export default MainScreen
