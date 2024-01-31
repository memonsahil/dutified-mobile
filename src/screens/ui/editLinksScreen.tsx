import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Linking,
    Alert,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import * as Crypto from 'expo-crypto'
import authUser from '../../data/classes/authUser'
import requestStatus from '../../enums/requestStatus'
import authStore from '../../state/stores/authStore'
import promiseType from '../../data/types/promiseType'

const EditLinksScreen = () => {
    const [link, setLink] = useState<string>('')
    const [links, setLinks] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const { currentUser, setCurrentUser } = authStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        currentUser?.profile.links && currentUser?.profile.links !== links
            ? setLinks(currentUser?.profile.links)
            : setLinks([])
    }, [currentUser?.profile.links])

    return (
        <View style={styles.container}>
            {loading === false ? (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        contentContainerStyle={styles.scrollView}
                    >
                        <View style={styles.headerSection}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <MaterialCommunityIcons
                                    name="chevron-left-circle"
                                    size={26}
                                    color={themeColors.YELLOW_GREEN}
                                />
                            </TouchableOpacity>
                            <Text style={styles.heading}>Links</Text>
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>Update Links</Text>
                            <TextInput
                                placeholder="Link"
                                value={link}
                                onChangeText={setLink}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect={false}
                                inputMode="url"
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                link !== ''
                                    ? (setLinks([
                                          ...links,
                                          link.includes('http')
                                              ? link
                                              : `https://${link}`,
                                      ]),
                                      setLink(''))
                                    : null
                            }}
                        >
                            <MaterialCommunityIcons
                                name="link-plus"
                                size={26}
                                color={themeColors.YELLOW_GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.button}>Add</Text>
                        </TouchableOpacity>
                        {links.length !== 0 ? (
                            <>
                                {Object.values(links).map((link) => (
                                    <View
                                        key={Crypto.randomUUID()}
                                        style={styles.linkContainer}
                                    >
                                        <TouchableOpacity
                                            onPress={() =>
                                                Linking.openURL(link)
                                            }
                                        >
                                            <Text
                                                style={styles.link}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {link}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setLinks(
                                                    links.filter(
                                                        (_link) =>
                                                            _link !== link
                                                    )
                                                )
                                            }}
                                        >
                                            <MaterialCommunityIcons
                                                name="close-circle"
                                                size={26}
                                                color={themeColors.YELLOW_GREEN}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </>
                        ) : null}
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                setLoading(true)
                                authUser
                                    .setLinks({
                                        links: links,
                                    })
                                    .then((response: promiseType) => {
                                        if (
                                            response.status ===
                                            requestStatus.SUCCESS
                                        ) {
                                            currentUser &&
                                            currentUser.profile.links
                                                ? setCurrentUser({
                                                      ...currentUser,
                                                      profile: {
                                                          ...currentUser.profile,
                                                          links: links,
                                                      },
                                                  })
                                                : null
                                            navigation.goBack()
                                        } else {
                                            setLoading(false)
                                            Alert.alert(
                                                'Error Occurred',
                                                'Please contact our support team.',
                                                [
                                                    {
                                                        text: 'Dismiss',
                                                        onPress: () => {},
                                                    },
                                                ]
                                            )
                                        }
                                    })
                            }}
                        >
                            <MaterialCommunityIcons
                                name="content-save"
                                size={26}
                                color={themeColors.YELLOW_GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.button}>Save</Text>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>
                </TouchableWithoutFeedback>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={themeColors.YELLOW_GREEN}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.BLACK,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: '20%',
        paddingLeft: '10%',
        paddingRight: '10%',
        width: '100%',
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.WHITE,
        paddingLeft: '5%',
    },
    mainSection: {
        width: '80%',
    },
    field: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        paddingTop: '10%',
        color: themeColors.WHITE,
        alignSelf: 'flex-start',
    },
    textInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '100%',
        paddingTop: '5%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 3,
        alignSelf: 'center',
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
        paddingHorizontal: '10%',
        marginTop: '10%',
    },
    link: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        textDecorationLine: 'underline',
        width: 275,
    },
    buttonContainer: {
        paddingTop: '10%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginRight: '3%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
    },
})

export default EditLinksScreen
