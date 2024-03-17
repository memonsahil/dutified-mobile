import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import { Avatar } from 'react-native-elements'
import categories from '../../enums/categories'
import authStore from '../../state/stores/authStore'
import util from '../../util/util'
import { s, vs } from 'react-native-size-matters'
import Carousel from 'react-native-snap-carousel'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import authUser from '../../data/classes/authUser'
import promiseType from '../../data/types/promiseType'
import requestStatus from '../../enums/requestStatus'
import * as Progress from 'react-native-progress'

const SignUpScreen = () => {
    const [first, setFirst] = useState<string>('')
    const [last, setLast] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [enteredCategory, setEnteredCategory] = useState<string>('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [searchResults, setSearchResults] = useState<string[]>([])
    const [link, setLink] = useState<string>('')
    const [links, setLinks] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const creationDate = new Date().toDateString()

    const { setCurrentUser } = authStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    const carouselItems: {
        content: JSX.Element
    }[] = [
        {
            content: (
                <View style={styles.content}>
                    <View>
                        <Text style={[styles.field, { paddingTop: vs(20) }]}>
                            Name
                        </Text>
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
                    </View>
                    <View>
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
                    </View>
                    <View>
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
                    </View>
                    <View>
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
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.buttonWrapper,
                            { paddingBottom: vs(20) },
                        ]}
                        onPress={() => {}}
                    >
                        <MaterialCommunityIcons
                            name="chevron-right-circle"
                            size={28}
                            color={themeColors.GREEN}
                            style={styles.iconButton}
                        />
                        <Text style={styles.button}>Next</Text>
                    </TouchableOpacity>
                </View>
            ),
        },
        {
            content: (
                <View style={styles.content}>
                    <Text style={[styles.field, { paddingTop: vs(20) }]}>
                        Profile Picture
                    </Text>
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
                    <View
                        style={[
                            styles.buttonContainer,
                            { paddingBottom: vs(20) },
                        ]}
                    >
                        <TouchableOpacity
                            onPress={() => util.pickImage(setImage)}
                            style={styles.buttonWrapper}
                        >
                            <MaterialCommunityIcons
                                name="file-image-plus"
                                size={28}
                                color={themeColors.GREEN}
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
                                size={28}
                                color={themeColors.GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.button}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {}}
                            style={styles.buttonWrapper}
                        >
                            <MaterialCommunityIcons
                                name="chevron-right-circle"
                                size={28}
                                color={themeColors.GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.button}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ),
        },
        {
            content: (
                <View style={styles.content}>
                    <Text style={[styles.field, { paddingTop: vs(20) }]}>
                        Bio
                    </Text>
                    <TextInput
                        placeholder="Enter your bio here."
                        value={desc}
                        onChangeText={setDesc}
                        style={styles.descTextInput}
                        placeholderTextColor={themeColors.BLACK}
                        inputMode="text"
                        multiline
                    />
                    <TouchableOpacity
                        onPress={() => {}}
                        style={[
                            styles.buttonWrapper,
                            { paddingBottom: vs(20) },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="chevron-right-circle"
                            size={28}
                            color={themeColors.GREEN}
                            style={styles.iconButton}
                        />
                        <Text style={styles.button}>Next</Text>
                    </TouchableOpacity>
                </View>
            ),
        },
        {
            content: (
                <View style={[styles.content]}>
                    <View>
                        <Text style={[styles.field, { paddingTop: vs(20) }]}>
                            Categories
                        </Text>
                        <TextInput
                            placeholder="Web Development"
                            value={enteredCategory}
                            onChangeText={setEnteredCategory}
                            style={styles.input}
                            placeholderTextColor={themeColors.SILVER}
                            autoCapitalize="words"
                            inputMode="text"
                        />
                        <View style={styles.categoriesWrapper}>
                            <ScrollView
                                contentContainerStyle={
                                    styles.categoriesContainer
                                }
                                style={styles.categoriesScrollView}
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
                                                          category,
                                                          ...selectedCategories,
                                                          ...selectedCategories,
                                                          category,
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
                        </View>
                    </View>
                    {selectedCategories.length !== 0 ? (
                        <View>
                            <Text style={styles.field}>Selected</Text>
                            <View style={styles.selectedCategoriesWrapper}>
                                <ScrollView>
                                    {Object.values(selectedCategories).map(
                                        (category) => (
                                            <TouchableOpacity
                                                key={category}
                                                onPress={() => {
                                                    setSelectedCategories(
                                                        selectedCategories.filter(
                                                            (
                                                                _selectedCategory
                                                            ) =>
                                                                _selectedCategory !==
                                                                category
                                                        )
                                                    )
                                                }}
                                            >
                                                <Text
                                                    style={
                                                        styles.selectedCategory
                                                    }
                                                >
                                                    {category}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    )}
                                </ScrollView>
                            </View>
                        </View>
                    ) : null}
                    <TouchableOpacity
                        onPress={() => {}}
                        style={[
                            styles.buttonWrapper,
                            { paddingBottom: vs(20) },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="chevron-right-circle"
                            size={28}
                            color={themeColors.GREEN}
                            style={styles.iconButton}
                        />
                        <Text style={styles.button}>Next</Text>
                    </TouchableOpacity>
                </View>
            ),
        },
        {
            content: (
                <View style={styles.content}>
                    <View>
                        <Text style={[styles.field, { paddingTop: vs(20) }]}>
                            Links
                        </Text>
                        <TextInput
                            placeholder="linkedIn.com/username"
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
                            style={[
                                styles.buttonWrapper,
                                { marginTop: vs(40) },
                            ]}
                            onPress={() => {
                                link !== ''
                                    ? (setLinks([
                                          link.includes('http')
                                              ? link
                                              : `https://${link}`,
                                          ...links,
                                      ]),
                                      setLink(''))
                                    : null
                            }}
                        >
                            <MaterialCommunityIcons
                                name="link-plus"
                                size={28}
                                color={themeColors.GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.button}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    {links.length !== 0 ? (
                        <View>
                            <Text
                                style={[styles.field, { paddingTop: vs(20) }]}
                            >
                                Selected
                            </Text>
                            <View style={styles.linksWrapper}>
                                <ScrollView>
                                    {Object.values(links).map((link) => (
                                        <TouchableOpacity
                                            key={link}
                                            onPress={() => {
                                                setLinks(
                                                    links.filter(
                                                        (_link) =>
                                                            _link !== link
                                                    )
                                                )
                                            }}
                                        >
                                            <Text style={styles.link}>
                                                {link}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    ) : null}
                    <TouchableOpacity
                        onPress={() => {}}
                        style={[
                            styles.buttonWrapper,
                            { paddingBottom: vs(20) },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="chevron-right-circle"
                            size={28}
                            color={themeColors.GREEN}
                            style={styles.iconButton}
                        />
                        <Text style={styles.button}>Next</Text>
                    </TouchableOpacity>
                </View>
            ),
        },
        {
            content: (
                <View style={styles.content}>
                    <Text style={styles.title}>You're Ready!</Text>
                    <View style={styles.infoSection}>
                        <View style={styles.infoTextWrapper}>
                            <MaterialCommunityIcons
                                name="account-cowboy-hat"
                                size={28}
                                color={themeColors.GREEN}
                            />
                            <Text style={styles.infoText}>
                                Create a job and hire someone to work on it.
                            </Text>
                        </View>
                        <View style={styles.infoTextWrapper}>
                            <MaterialCommunityIcons
                                name="cash-fast"
                                size={28}
                                color={themeColors.GREEN}
                            />
                            <Text style={styles.infoText}>
                                Make the job payment and let them get to work.
                            </Text>
                        </View>
                        <View style={styles.infoTextWrapper}>
                            <MaterialCommunityIcons
                                name="account-multiple"
                                size={28}
                                color={themeColors.GREEN}
                            />
                            <Text style={styles.infoText}>
                                Collaborate with them and track your job's
                                progress.
                            </Text>
                        </View>
                    </View>
                    <View>
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
                                                userName: first + ' ' + last,
                                                userAvatar: image ? image : '',
                                                countryCode: code,
                                                phoneNumber: phone,
                                                emailAddress: email,
                                                cardNumber: '',
                                                securityCode: '',
                                                expiryMonth: '',
                                                expiryYear: '',
                                                userDesc: desc ? desc : '',
                                                categories: selectedCategories
                                                    ? selectedCategories
                                                    : [],
                                                links: links ? links : [],
                                                notifications: [],
                                                network: [],
                                                projectsCreated: [],
                                                projectsWorked: [],
                                                jobsCreated: [],
                                                jobsWorked: [],
                                                postsCreated: [],
                                                userFeedPosts: [],
                                                chats: [],
                                                transactions: [],
                                                feedbacks: [],
                                                creationDate: creationDate,
                                            },
                                            password: password,
                                        })
                                        .then((response: promiseType) => {
                                            if (
                                                response.status ===
                                                requestStatus.SUCCESS
                                            ) {
                                                setCurrentUser({
                                                    userName:
                                                        first + ' ' + last,
                                                    userAvatar: image
                                                        ? image
                                                        : '',
                                                    countryCode: code,
                                                    phoneNumber: phone,
                                                    emailAddress: email,
                                                    cardNumber: '',
                                                    securityCode: '',
                                                    expiryMonth: '',
                                                    expiryYear: '',
                                                    userDesc: desc ? desc : '',
                                                    categories:
                                                        selectedCategories
                                                            ? selectedCategories
                                                            : [],
                                                    links: links ? links : [],
                                                    notifications: [],
                                                    network: [],
                                                    projectsCreated: [],
                                                    projectsWorked: [],
                                                    jobsCreated: [],
                                                    jobsWorked: [],
                                                    postsCreated: [],
                                                    userFeedPosts: [],
                                                    chats: [],
                                                    transactions: [],
                                                    feedbacks: [],
                                                    creationDate: creationDate,
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
                                                                onPress:
                                                                    () => {},
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
                                                                onPress:
                                                                    () => {},
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
                                                                onPress:
                                                                    () => {},
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
                                                                onPress:
                                                                    () => {},
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
                                size={28}
                                color={themeColors.GREEN}
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
                    </View>
                </View>
            ),
        },
    ]

    const infoCard = ({ item }: { item: { content: JSX.Element } }) => {
        return <View style={styles.infoCard}>{item.content}</View>
    }

    useEffect(() => {
        if (enteredCategory !== '') {
            setSearchResults(util.searchCategories(categories, enteredCategory))
        } else {
            setSearchResults(Object.values(categories))
        }
    }, [enteredCategory])

    return (
        <View style={styles.container}>
            {loading === false ? (
                <KeyboardAwareScrollView enableOnAndroid={true}>
                    <View style={styles.headerSection}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                                name="chevron-left-circle"
                                size={28}
                                color={themeColors.GREEN}
                                style={styles.backIcon}
                            />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Sign Up</Text>
                    </View>
                    <Carousel
                        layout={'default'}
                        data={carouselItems}
                        sliderWidth={s(350)}
                        itemWidth={s(300)}
                        renderItem={infoCard}
                        snapToAlignment={'center'}
                    />
                </KeyboardAwareScrollView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={themeColors.GREEN}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.MINT,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerSection: {
        flexDirection: 'row',
        paddingTop: vs(60),
        paddingLeft: s(20),
    },
    backIcon: {
        paddingTop: vs(10),
    },
    heading: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.HEADING_ONE,
        color: themeColors.BLACK,
        paddingLeft: s(20),
    },
    infoCard: {
        backgroundColor: themeColors.WHITE,
        borderRadius: 20,
        width: s(300),
        height: vs(510),
        marginTop: vs(10),
        paddingHorizontal: s(20),
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
    },
    field: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
    },
    input: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.GREEN,
        paddingTop: vs(10),
        borderBottomColor: themeColors.BLACK,
        borderBottomWidth: 1,
    },
    phoneInputWrapper: {
        flexDirection: 'row',
        width: '100%',
        paddingTop: vs(10),
        textAlignVertical: 'center',
    },
    codePlus: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.INPUT,
        color: themeColors.BLACK,
        width: vs(30),
    },
    codeInput: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.INPUT,
        color: themeColors.GREEN,
        width: vs(30),
        marginRight: vs(10),
        borderBottomColor: themeColors.BLACK,
        borderBottomWidth: 1,
    },
    phoneInput: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.INPUT,
        color: themeColors.GREEN,
        width: vs(160),
        borderBottomColor: themeColors.BLACK,
        borderBottomWidth: 1,
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    iconButton: {
        marginRight: s(10),
    },
    button: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.GREEN,
    },
    avatarContainer: {
        backgroundColor: themeColors.GREEN,
        alignSelf: 'center',
    },
    buttonContainer: {
        height: vs(170),
        justifyContent: 'space-between',
    },
    descTextInput: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.BLACK,
        overflow: 'scroll',
        height: vs(370),
        paddingHorizontal: s(10),
        borderRadius: 20,
        backgroundColor: themeColors.SILVER,
        textAlignVertical: 'top',
    },
    categoriesWrapper: {
        height: vs(150),
        paddingTop: vs(10),
    },
    categoriesContainer: {
        alignItems: 'flex-start',
        overflow: 'hidden',
        paddingTop: vs(10),
        paddingHorizontal: s(20),
    },
    categoriesScrollView: {
        borderRadius: 20,
        backgroundColor: themeColors.SILVER,
    },
    category: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.WHITE,
        backgroundColor: themeColors.GREEN,
        marginRight: s(5),
        paddingHorizontal: s(5),
        marginBottom: s(10),
    },
    selectedCategoriesWrapper: {
        height: vs(150),
    },
    selectedCategory: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.WHITE,
        backgroundColor: themeColors.GREEN,
        paddingHorizontal: s(5),
        marginTop: s(10),
        alignSelf: 'flex-start',
    },
    linksWrapper: {
        height: vs(200),
    },
    link: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.GREEN,
        textDecorationLine: 'underline',
        marginTop: s(10),
    },
    title: {
        paddingTop: vs(50),
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.BLACK,
        alignSelf: 'center',
    },
    infoSection: {
        alignItems: 'flex-start',
    },
    infoTextWrapper: {
        flexDirection: 'row',
        paddingBottom: vs(20),
        alignItems: 'center',
        paddingRight: s(20),
    },
    infoText: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        paddingLeft: '10%',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: vs(40),
    },
    textButton: {
        fontFamily: 'Karma-Bold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.BLACK,
        textDecorationLine: 'underline',
    },
})

export default SignUpScreen
