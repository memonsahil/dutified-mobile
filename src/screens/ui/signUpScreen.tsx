import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Alert,
    Linking,
    ScrollView,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import requestStatus from '../../enums/requestStatus'
import authUser from '../../data/classes/authUser'
import * as Crypto from 'expo-crypto'
import promiseType from '../../data/types/promiseType'
import { Avatar } from 'react-native-elements'
import {
    ImageResult,
    manipulateAsync,
    SaveFormat,
} from 'expo-image-manipulator'
import categories from '../../enums/categories'
import * as ImagePicker from 'expo-image-picker'
import authStore from '../../state/stores/authStore'

const SignUpScreen = () => {
    let formattedImage: ImageResult
    const userId = Crypto.randomUUID()

    const [first, setFirst] = useState<string>('')
    const [last, setLast] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const [image, setImage] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [paymentAmount, setPaymentAmount] = useState<string>('')
    const [enteredCategory, setEnteredCategory] = useState<string>('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [searchResults, setSearchResults] = useState<string[]>([])
    const [link, setLink] = useState<string>('')
    const [links, setLinks] = useState<string[]>([])

    const { setCurrentUser } = authStore((state) => state)

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
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    contentContainerStyle={styles.scrollView}
                >
                    <View style={styles.headerSection}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                                name="chevron-left-circle"
                                size={26}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Sign Up</Text>
                    </View>
                    <View style={styles.signUpSection}>
                        <Text style={styles.subHeading}>Account</Text>
                        <Text style={styles.text}>
                            Enter your account details below, these can be
                            updated later.
                        </Text>
                        <Text style={styles.field}>Name</Text>
                        <TextInput
                            placeholder="First"
                            value={first}
                            onChangeText={setFirst}
                            style={styles.input}
                            placeholderTextColor={themeColors.SILVER}
                            autoCapitalize="words"
                            autoComplete="off"
                            autoCorrect={false}
                        />
                        <TextInput
                            placeholder="Last"
                            value={last}
                            onChangeText={setLast}
                            style={styles.input}
                            placeholderTextColor={themeColors.SILVER}
                            autoCapitalize="words"
                            autoComplete="off"
                            autoCorrect={false}
                        />
                        <Text style={styles.field}>Phone</Text>
                        <View style={styles.phoneInputWrapper}>
                            <Text style={styles.codePlus}>+</Text>
                            <TextInput
                                placeholder="000"
                                value={code}
                                onChangeText={setCode}
                                style={styles.codeInput}
                                placeholderTextColor={themeColors.SILVER}
                                inputMode="tel"
                            />
                            <TextInput
                                placeholder="123456789"
                                value={phone}
                                onChangeText={setPhone}
                                style={styles.phoneInput}
                                placeholderTextColor={themeColors.SILVER}
                                inputMode="tel"
                            />
                        </View>
                        <Text style={styles.field}>Email</Text>
                        <TextInput
                            placeholder="you@domain.com"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholderTextColor={themeColors.SILVER}
                            inputMode="email"
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                        />
                        <Text style={styles.field}>Password</Text>
                        <TextInput
                            placeholder="••••••••"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            placeholderTextColor={themeColors.SILVER}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                        />
                        <Text style={styles.subHeading}>Profile</Text>
                        <Text style={styles.text}>
                            Enter your profile details below, these can be
                            updated later.
                        </Text>
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
                            <TouchableOpacity
                                onPress={() => pickImage()}
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="file-image-plus"
                                    size={26}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>Upload</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setImage('')
                                }}
                                style={styles.buttonWrapper}
                            >
                                <MaterialCommunityIcons
                                    name="square-edit-outline"
                                    size={26}
                                    color={themeColors.YELLOW_GREEN}
                                    style={styles.iconButton}
                                />
                                <Text style={styles.button}>Reset</Text>
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
                            style={styles.input}
                            placeholderTextColor={themeColors.SILVER}
                            autoCapitalize="words"
                            inputMode="text"
                        />
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.categoriesScrollView}
                        >
                            {Object.values(searchResults).map((category) => (
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
                            ))}
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
                                            <Text
                                                style={styles.selectedCategory}
                                            >
                                                {selectedCategory}
                                            </Text>
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
                            style={styles.input}
                            placeholderTextColor={themeColors.SILVER}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                            inputMode="url"
                        />
                        <TouchableOpacity
                            style={styles.buttonWrapper}
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
                        <Text style={styles.quote}>
                            "Pleasure in the job puts perfection in the work." -
                            Aristotle
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (
                                first !== '' &&
                                last !== '' &&
                                code !== '' &&
                                phone !== '' &&
                                email !== '' &&
                                password != ''
                            ) {
                                setLoading(true)
                                authUser
                                    .signUp({
                                        user: {
                                            profile: {
                                                userId: userId,
                                                firstName: first,
                                                lastName: last,
                                                countryCode: code,
                                                phoneNumber: phone,
                                                emailAddress: email,
                                                profilePicture: image,
                                                bio: desc,
                                                ratePerDay: paymentAmount,
                                                interests: selectedCategories,
                                                links: links,
                                            },
                                            projectsCreated: [],
                                            projectsWorked: [],
                                            jobsCreated: [],
                                            jobsWorked: [],
                                            feedbacks: [],
                                            transactions: [],
                                            chats: [],
                                            metaData: {
                                                creationDate: new Date(),
                                                lastLoginDate: new Date(),
                                                lastLogoutDate: null,
                                                lastTransactionDate: null,
                                            },
                                        },
                                        password: password,
                                    })
                                    .then((response: promiseType) => {
                                        if (
                                            response.status ===
                                            requestStatus.SUCCESS
                                        ) {
                                            setCurrentUser({
                                                profile: {
                                                    userId: userId,
                                                    firstName: first,
                                                    lastName: last,
                                                    countryCode: code,
                                                    phoneNumber: phone,
                                                    emailAddress: email,
                                                    profilePicture: image,
                                                    bio: desc,
                                                    ratePerDay: paymentAmount,
                                                    interests:
                                                        selectedCategories,
                                                    links: links,
                                                },
                                                projectsCreated: [],
                                                projectsWorked: [],
                                                jobsCreated: [],
                                                jobsWorked: [],
                                                feedbacks: [],
                                                transactions: [],
                                                chats: [],
                                                metaData: {
                                                    creationDate: new Date(),
                                                    lastLoginDate: new Date(),
                                                    lastLogoutDate: null,
                                                    lastTransactionDate: null,
                                                },
                                            })
                                            setLoading(false)
                                        } else {
                                            if (
                                                response.status ===
                                                    requestStatus.ERROR &&
                                                response.errorCode ===
                                                    'auth/email-already-in-use'
                                            ) {
                                                setLoading(false)
                                                Alert.alert(
                                                    'Account Exists',
                                                    'An account already exists with this email address.',
                                                    [
                                                        {
                                                            text: 'Dismiss',
                                                            onPress: () => {},
                                                        },
                                                    ]
                                                )
                                            } else if (
                                                response.status ===
                                                    requestStatus.ERROR &&
                                                response.errorCode ===
                                                    'auth/invalid-email'
                                            ) {
                                                setLoading(false)
                                                Alert.alert(
                                                    'Invalid Email',
                                                    'Please enter a valid email address.',
                                                    [
                                                        {
                                                            text: 'Dismiss',
                                                            onPress: () => {},
                                                        },
                                                    ]
                                                )
                                            } else if (
                                                response.status ===
                                                    requestStatus.ERROR &&
                                                response.errorCode ===
                                                    'auth/weak-password'
                                            ) {
                                                setLoading(false)

                                                Alert.alert(
                                                    'Weak Password',
                                                    'Please enter a strong password.',
                                                    [
                                                        {
                                                            text: 'Dismiss',
                                                            onPress: () => {},
                                                        },
                                                    ]
                                                )
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
                                        }
                                    })
                            } else {
                                Alert.alert(
                                    'Missing Details',
                                    'Please enter all of your account details before signing up.',
                                    [
                                        {
                                            text: 'Dismiss',
                                            onPress: () => {},
                                        },
                                    ]
                                )
                            }
                        }}
                        style={styles.buttonWrapper}
                    >
                        <MaterialCommunityIcons
                            name="account-check"
                            size={26}
                            color={themeColors.YELLOW_GREEN}
                            style={styles.iconButton}
                        />
                        <Text style={styles.button}>Sign Up</Text>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TOS')}
                        >
                            <Text style={styles.textButton}>
                                Terms of Service
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('PP')}
                        >
                            <Text style={styles.textButton}>
                                Privacy Policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
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
        justifyContent: 'flex-start',
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
    signUpSection: {
        width: '80%',
    },
    subHeading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_TWO,
        paddingTop: '10%',
        color: themeColors.WHITE,
    },
    text: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingTop: '10%',
    },
    field: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        paddingTop: '10%',
        color: themeColors.WHITE,
    },
    input: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '100%',
        paddingTop: '5%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 3,
        alignSelf: 'center',
    },
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
        marginTop: '10%',
        alignSelf: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    phoneInputWrapper: {
        flexDirection: 'row',
        width: '100%',
    },
    codePlus: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '10%',
        paddingTop: '5%',
        textAlignVertical: 'center',
    },
    codeInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '15%',
        marginRight: '5%',
        paddingTop: '5%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 3,
        textAlignVertical: 'center',
    },
    phoneInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '70%',
        paddingTop: '5%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 3,
        textAlignVertical: 'center',
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '10%',
        alignSelf: 'center',
    },
    iconButton: {
        marginRight: '3%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
        alignSelf: 'center',
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
        marginTop: '10%',
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
        alignSelf: 'flex-start',
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        width: '100%',
        marginTop: '10%',
    },
    link: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        textDecorationLine: 'underline',
        width: 275,
    },
    quote: {
        fontFamily: 'Borel-Regular',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.YELLOW_GREEN,
        paddingTop: '15%',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: '20%',
        width: '70%',
    },
    textButton: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_THREE,
        paddingTop: '10%',
        color: themeColors.WHITE,
        textDecorationLine: 'underline',
    },
})

export default SignUpScreen
