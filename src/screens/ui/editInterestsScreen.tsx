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
    Alert,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import categories from '../../enums/categories'
import authUser from '../../data/classes/authUser'
import promiseType from '../../data/types/promiseType'
import requestStatus from '../../enums/requestStatus'
import util from '../../util/util'
import authStore from '../../state/stores/authStore'

const EditInterestsScreen = () => {
    const [enteredCategory, setEnteredCategory] = useState<string>('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [searchResults, setSearchResults] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const { currentUser, setCurrentUser } = authStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        if (enteredCategory !== '') {
            setSearchResults(util.searchCategories(categories, enteredCategory))
        } else {
            setSearchResults(Object.values(categories))
        }
    }, [enteredCategory])

    useEffect(() => {
        currentUser?.profile.interests &&
        currentUser?.profile.interests !== selectedCategories
            ? setSelectedCategories(currentUser?.profile.interests)
            : setSelectedCategories([])
    }, [currentUser?.profile.interests])

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
                                    color={themeColors.GREEN}
                                />
                            </TouchableOpacity>
                            <Text style={styles.heading}>Interests</Text>
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>Update Interests</Text>
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
                                                <Text
                                                    style={
                                                        styles.selectedCategory
                                                    }
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
                                                            themeColors.GREEN
                                                        }
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    )}
                                </>
                            ) : null}
                        </View>
                        <TouchableOpacity
                            style={styles.saveButtonContainer}
                            onPress={() => {
                                setLoading(true)
                                authUser
                                    .setInterests({
                                        interests: selectedCategories,
                                    })
                                    .then((response: promiseType) => {
                                        if (
                                            response.status ===
                                            requestStatus.SUCCESS
                                        ) {
                                            currentUser &&
                                            currentUser.profile.interests
                                                ? setCurrentUser({
                                                      ...currentUser,
                                                      profile: {
                                                          ...currentUser.profile,
                                                          interests:
                                                              selectedCategories,
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
                                color={themeColors.GREEN}
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
        backgroundColor: themeColors.GREEN,
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
        backgroundColor: themeColors.GREEN,
        padding: '1%',
        alignSelf: 'flex-start',
    },
    saveButtonContainer: {
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
        color: themeColors.GREEN,
    },
})

export default EditInterestsScreen
