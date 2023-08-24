import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import AuthUser from '../data/authUser'
import useAuthUserStore from '../stores/useAuthUserStore'
import * as Progress from 'react-native-progress'
import { AntDesign } from '@expo/vector-icons'
import colors from '../enums/colors'
import fonts from '../enums/fonts'
import categories from '../enums/categories'
import screens from '../types/params/screens'

const WorkSetupScreen = () => {
    const [enteredCategory, setEnteredCategory] = useState<string>('')
    const [selectedCategories, setSelectedCategories] = useState<Array<string>>(
        []
    )
    const [searchResults, setSearchResults] = useState<string[]>([])
    const [totalJobs, setTotalJobs] = useState('')
    const [loading, setLoading] = useState<boolean>(false)

    const navigation: NavigationProp<screens> = useNavigation()

    const { updateWorkSetup } = useAuthUserStore((state) => state)

    useEffect(() => {
        if (enteredCategory !== '') {
            setSearchResults(searchCategories(categories, enteredCategory))
        } else {
            setSearchResults(Object.values(categories))
        }
    }, [enteredCategory])

    const searchCategories = (
        categories: Record<string, string>,
        searchArg: string
    ) => {
        let results: string[] = []

        for (const category in categories) {
            if (
                categories[category]
                    .toLowerCase()
                    .includes(searchArg.toLowerCase())
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
                            <AntDesign
                                name="caretleft"
                                size={30}
                                color={colors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Work Setup</Text>
                    </View>
                    <Text style={styles.info}>
                        Setup your preferred categories and number of jobs that
                        you want to work on this month.
                    </Text>
                    <Text style={styles.field}>Preferred Categories</Text>
                    <TextInput
                        placeholder="Search for a category."
                        value={enteredCategory}
                        onChangeText={setEnteredCategory}
                        style={styles.textInput}
                        placeholderTextColor={colors.SILVER}
                        inputMode="text"
                    />
                    <View style={styles.searchContainer}>
                        <Text style={styles.searchCategoriesHeading}>
                            Options
                        </Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.categoriesScrollView}
                        >
                            {Object.values(searchResults).map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    onPress={() => {
                                        if (
                                            selectedCategories.includes(
                                                category
                                            ) === false
                                        ) {
                                            setSelectedCategories([
                                                ...selectedCategories,
                                                category,
                                            ])
                                            setEnteredCategory('')
                                        } else {
                                            Alert.alert(
                                                'Already Selected',
                                                'This category is already selected.',
                                                [
                                                    {
                                                        text: 'Dismiss',
                                                        onPress: () => {},
                                                    },
                                                ]
                                            )
                                        }
                                    }}
                                >
                                    <Text style={styles.category}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    {selectedCategories.length !== 0 ? (
                        <View style={styles.selectedContainer}>
                            <Text style={styles.selectedCategoriesHeading}>
                                Selected
                            </Text>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={
                                    styles.categoriesScrollView
                                }
                            >
                                {Object.values(selectedCategories).map(
                                    (category) => (
                                        <TouchableOpacity
                                            key={category}
                                            onPress={() => {}}
                                        >
                                            <Text style={styles.category}>
                                                {category}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                )}
                            </ScrollView>
                        </View>
                    ) : null}
                    <Text style={styles.field}>Number of Jobs</Text>
                    <TextInput
                        placeholder="10"
                        value={totalJobs}
                        onChangeText={setTotalJobs}
                        style={styles.numericInput}
                        placeholderTextColor={colors.SILVER}
                        inputMode="numeric"
                    />
                    <TouchableOpacity
                        style={styles.saveButtonContainer}
                        onPress={() => {
                            if (
                                selectedCategories.length !== 0 &&
                                totalJobs !== ''
                            ) {
                                setLoading(true)

                                AuthUser.setWorkSetup({
                                    preferredCategories: selectedCategories,
                                    totalJobs: totalJobs
                                        .split('.')[0]
                                        .replace(/,/g, ''),
                                })
                                    .then(() => {
                                        updateWorkSetup({
                                            preferredCategories:
                                                selectedCategories,
                                            totalJobs: totalJobs
                                                .split('.')[0]
                                                .replace(/,/g, ''),
                                        })

                                        setLoading(false)

                                        navigation.goBack()
                                    })
                                    .catch(() => {
                                        Alert.alert(
                                            'Error Occurred',
                                            'An error occurred, please try again or contact our support team.',
                                            [
                                                {
                                                    text: 'Dismiss',
                                                    onPress: () => {
                                                        navigation.goBack()
                                                    },
                                                },
                                            ]
                                        )
                                    })
                            } else {
                                Alert.alert(
                                    'Missing Details',
                                    'Please enter all of your details before saving your work setup.',
                                    [
                                        {
                                            text: 'Dismiss',
                                            onPress: () => {},
                                        },
                                    ]
                                )
                            }
                        }}
                    >
                        <Text style={styles.saveButton}>Save</Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={colors.YELLOW_GREEN}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.RAISIN_BLACK,
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
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.HEADING_TWO,
        color: colors.PLATINUM,
        paddingLeft: 20,
        paddingRight: 30,
    },
    info: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fonts.BODY_ONE,
        color: colors.PLATINUM,
        width: '80%',
        alignSelf: 'center',
        paddingTop: '5%',
    },
    selectedContainer: {
        width: '85%',
        overflow: 'hidden',
        alignItems: 'flex-start',
    },
    searchContainer: {
        backgroundColor: colors.PLATINUM,
        borderRadius: 15,
        width: '85%',
        overflow: 'hidden',
        paddingBottom: '5%',
        marginTop: '5%',
    },
    selectedCategoriesHeading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.BODY_ONE,
        color: colors.PLATINUM,
        paddingTop: '5%',
        paddingLeft: 10,
    },
    searchCategoriesHeading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.BODY_ONE,
        color: colors.JET,
        paddingTop: '5%',
        paddingLeft: 10,
    },
    categoriesScrollView: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: '5%',
    },
    category: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.BODY_TWO,
        color: colors.JET,
        backgroundColor: colors.YELLOW_GREEN,
        padding: 5,
        marginRight: 10,
    },
    field: {
        alignSelf: 'flex-start',
        paddingLeft: 40,
        paddingTop: '7%',
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.BUTTON_ONE,
        color: colors.PLATINUM,
    },
    numericInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fonts.INPUT_ONE,
        color: colors.PLATINUM,
        width: '80%',
        paddingTop: '5%',
        borderBottomColor: colors.PLATINUM,
        borderBottomWidth: 2,
        alignSelf: 'center',
    },
    textInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fonts.INPUT_ONE,
        color: colors.PLATINUM,
        width: '80%',
        paddingTop: '5%',
        borderBottomColor: colors.PLATINUM,
        borderBottomWidth: 2,
        alignSelf: 'center',
    },
    saveButtonContainer: {
        paddingTop: '10%',
        paddingBottom: '20%',
    },
    saveButton: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fonts.BUTTON_ONE,
        color: colors.YELLOW_GREEN,
    },
})

export default WorkSetupScreen
