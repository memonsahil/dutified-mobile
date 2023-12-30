import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ScrollView,
    Linking,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as Crypto from 'expo-crypto'
import * as Progress from 'react-native-progress'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import categories from '../../enums/categories'
import screens from '../params/screens'
import { Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import {
    manipulateAsync,
    SaveFormat,
    ImageResult,
} from 'expo-image-manipulator'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const OnboardingScreen = () => {
    let formattedImage: ImageResult
    const [image, setImage] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [paymentAmount, setPaymentAmount] = useState<string>('')
    const [enteredCategory, setEnteredCategory] = useState<string>('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [searchResults, setSearchResults] = useState<string[]>([])
    const [link, setLink] = useState<string>('')
    const [links, setLinks] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        if (enteredCategory !== '') {
            setSearchResults(searchCategories(categories, enteredCategory))
        } else {
            setSearchResults(Object.values(categories))
        }
    }, [enteredCategory])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            formattedImage = await manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: 400, height: 400 } }],
                { compress: 1, format: SaveFormat.PNG, base64: true }
            )

            setImage('data:image/png;base64,' + formattedImage.base64)
        }
    }

    const searchCategories = (
        categories: Record<string, string>,
        searchArg: string
    ) => {
        let results: string[] = []

        for (const category in categories) {
            if (
                categories[category]
                    .toLowerCase()
                    .includes(searchArg.toLowerCase().replace(/\s/g, ''))
            ) {
                results.push(categories[category])
            }
        }

        return results
    }

    return (
        <View style={styles.container}>
            {loading === false ? (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        contentContainerStyle={styles.scrollView}
                    >
                        <View style={styles.headerSection}>
                            <Text style={styles.heading}>Onboarding</Text>
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>Profile Picture</Text>

                            <Avatar
                                size="xlarge"
                                rounded
                                source={
                                    image
                                        ? { uri: image }
                                        : require('../../../assets/images/user-avatar.png')
                                }
                                containerStyle={styles.avatarContainer}
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => pickImage()}>
                                    <Text style={styles.saveButton}>
                                        Upload
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setImage('')
                                    }}
                                >
                                    <Text style={styles.saveButton}>Reset</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.field}>Bio</Text>
                            <View style={styles.descContainer}>
                                <TextInput
                                    placeholder="Enter your bio here."
                                    value={desc}
                                    onChangeText={setDesc}
                                    style={styles.descTextInput}
                                    placeholderTextColor={themeColors.SILVER}
                                    inputMode="text"
                                    multiline
                                />
                            </View>
                            <Text style={styles.field}>Rate/Day</Text>
                            <View style={styles.amountWrapper}>
                                <Text style={styles.currency}>USD</Text>
                                <TextInput
                                    placeholder="80"
                                    value={paymentAmount}
                                    onChangeText={setPaymentAmount}
                                    style={styles.amountInput}
                                    placeholderTextColor={themeColors.SILVER}
                                    inputMode="decimal"
                                />
                            </View>
                            <Text style={styles.field}>Interests</Text>
                            <TextInput
                                placeholder="Web Development"
                                value={enteredCategory}
                                onChangeText={setEnteredCategory}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                autoCapitalize="words"
                                inputMode="text"
                            />
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={
                                    styles.categoriesScrollView
                                }
                            >
                                {Object.values(searchResults).map(
                                    (category) => (
                                        <TouchableOpacity
                                            key={category}
                                            onPress={() => {
                                                selectedCategories.includes(
                                                    category
                                                ) !== true
                                                    ? (setSelectedCategories([
                                                          ...selectedCategories,
                                                          category,
                                                      ]),
                                                      setEnteredCategory(''))
                                                    : null
                                            }}
                                        >
                                            <Text style={styles.category}>
                                                {category}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                )}
                            </ScrollView>
                            {selectedCategories.length !== 0 ? (
                                <>
                                    <Text style={styles.categoriesHeading}>
                                        Selected
                                    </Text>
                                    {Object.values(selectedCategories).map(
                                        (selectedCategory) => (
                                            <View
                                                key={selectedCategory}
                                                style={
                                                    styles.selectedCategoryContainer
                                                }
                                            >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setSelectedCategories(
                                                            selectedCategories.filter(
                                                                (category) =>
                                                                    category !==
                                                                    selectedCategory
                                                            )
                                                        )
                                                    }}
                                                >
                                                    <Text
                                                        style={
                                                            styles.selectedCategory
                                                        }
                                                    >
                                                        {selectedCategory}
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setSelectedCategories(
                                                            selectedCategories.filter(
                                                                (
                                                                    _selectedCategory
                                                                ) =>
                                                                    _selectedCategory !==
                                                                    selectedCategory
                                                            )
                                                        )
                                                    }}
                                                >
                                                    <MaterialCommunityIcons
                                                        name="close-circle"
                                                        size={26}
                                                        color={
                                                            themeColors.YELLOW_GREEN
                                                        }
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    )}
                                </>
                            ) : null}
                            <Text style={styles.field}>Links</Text>
                            <TextInput
                                placeholder="Link"
                                value={link}
                                onChangeText={setLink}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect={false}
                            />
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() => {
                                    link !== ''
                                        ? (setLinks([
                                              ...links,
                                              link.includes('http')
                                                  ? link
                                                  : `https://www.${link}`,
                                          ]),
                                          setLink(''))
                                        : null
                                }}
                            >
                                <Text style={styles.saveButton}>Add</Text>
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
                                                    color={
                                                        themeColors.YELLOW_GREEN
                                                    }
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </>
                            ) : null}
                            <TouchableOpacity
                                style={styles.launchButtonContainer}
                                onPress={() => {
                                    setLoading(true)
                                }}
                            >
                                <Text style={styles.button}>Onboard</Text>
                            </TouchableOpacity>
                            <Text style={styles.textSection}>
                                These details can be edited later in Settings.
                            </Text>
                        </View>
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
    },
    mainSection: {
        width: '80%',
    },
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
        marginTop: '10%',
        alignSelf: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    saveButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
        marginTop: '10%',
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
    categoriesHeading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingTop: '5%',
    },
    categoriesScrollView: {
        paddingTop: '5%',
    },
    category: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.YELLOW_GREEN,
        marginRight: 10,
        padding: 4,
    },
    selectedCategoryContainer: {
        marginTop: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    selectedCategory: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.YELLOW_GREEN,
        padding: '1%',
        marginTop: '5%',
        alignSelf: 'flex-start',
    },
    amountWrapper: {
        flexDirection: 'row',
        paddingTop: '5%',
    },
    currency: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '20%',
        textAlignVertical: 'center',
    },
    amountInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '80%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 3,
        textAlignVertical: 'center',
    },
    descContainer: {
        backgroundColor: themeColors.WHITE,
        height: 250,
        borderRadius: 20,
        marginTop: '5%',
        padding: 10,
    },
    descTextInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        padding: 5,
        textAlignVertical: 'top',
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
        paddingTop: '5%',
    },
    link: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        textDecorationLine: 'underline',
        width: 275,
    },
    launchButtonContainer: {
        paddingTop: '10%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
        alignSelf: 'center',
    },
    textSection: {
        textAlign: 'center',
        alignSelf: 'center',
        paddingTop: '10%',
        paddingBottom: '20%',
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.WHITE,
    },
})

export default OnboardingScreen
