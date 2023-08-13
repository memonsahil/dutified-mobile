import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import AuthUser from '../data/authUser'
import useAuthUserStore from '../stores/useAuthUserStore'
import * as Crypto from 'expo-crypto'
import * as Progress from 'react-native-progress'
import { AntDesign } from '@expo/vector-icons'
import {
    jet,
    raisinBlack,
    silver,
    yellowGreen,
    platinum,
} from '../theme/colors'
import categories from '../enums/categories'
import screens from '../types/params/screens'

const AddProjectScreen = () => {
    const [name, setName] = useState<string>('')
    const [enteredCategory, setEnteredCategory] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [searchResults, setSearchResults] = useState<string[]>([])
    const [desc, setDesc] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { userDetails } = useAuthUserStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

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
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        contentContainerStyle={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.headerSection}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <AntDesign
                                    name="caretleft"
                                    size={30}
                                    color={yellowGreen}
                                />
                            </TouchableOpacity>
                            <Text style={styles.heading}>New Project</Text>
                        </View>
                        <Text style={styles.field}>Category</Text>
                        <TextInput
                            placeholder="Search for a category."
                            value={enteredCategory}
                            onChangeText={setEnteredCategory}
                            style={styles.textInput}
                            placeholderTextColor={silver}
                            inputMode="text"
                        />
                        <View style={styles.searchContainer}>
                            <Text style={styles.searchCategoriesHeading}>
                                Options
                            </Text>
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
                                                setSelectedCategory(category)
                                                setEnteredCategory('')
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
                        {selectedCategory !== '' ? (
                            <View style={styles.selectedContainer}>
                                <Text style={styles.selectedCategoriesHeading}>
                                    Selected
                                </Text>
                                <Text style={styles.selectedCategory}>
                                    {selectedCategory}
                                </Text>
                            </View>
                        ) : null}
                        <Text style={styles.field}>Name</Text>
                        <TextInput
                            placeholder="Give your project a name."
                            value={name}
                            onChangeText={setName}
                            style={styles.textInput}
                            placeholderTextColor={silver}
                            inputMode="text"
                        />
                        <Text style={styles.field}>Description</Text>
                        <View style={styles.descContainer}>
                            <TextInput
                                placeholder="Describe your project's goal, types of jobs that you will create etc."
                                value={desc}
                                onChangeText={setDesc}
                                style={styles.descTextInput}
                                placeholderTextColor={silver}
                                inputMode="text"
                                multiline
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.launchButtonContainer}
                            onPress={() => {
                                if (
                                    name !== '' &&
                                    selectedCategory !== '' &&
                                    desc !== ''
                                ) {
                                    setLoading(true)

                                    AuthUser.addProject({
                                        projectId: Crypto.randomUUID(),
                                        projectName: name,
                                        projectCreatorId: userDetails.userId,
                                        projectCreator: `${userDetails.firstName} ${userDetails.lastName}`,
                                        category: selectedCategory,
                                        projectDesc: desc,
                                    })
                                        .then(() => {
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
                                        'Please enter all of your details before creating your project.',
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
                            <Text style={styles.launchButton}>Create</Text>
                        </TouchableOpacity>
                        <Text style={styles.textSection}>
                            Once your project is created, it can be viewed by
                            other users and these details cannot be changed
                            later.
                        </Text>
                    </KeyboardAwareScrollView>
                </TouchableWithoutFeedback>
            ) : (
                <View style={styles.loadingContainer}>
                    <Progress.Bar
                        width={250}
                        height={25}
                        borderRadius={20}
                        indeterminate={true}
                        color={yellowGreen}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: raisinBlack,
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
        fontSize: 30,
        color: platinum,
        paddingLeft: 20,
        paddingRight: 30,
    },
    selectedContainer: {
        width: '85%',
        overflow: 'hidden',
        alignItems: 'flex-start',
    },
    searchContainer: {
        backgroundColor: platinum,
        borderRadius: 15,
        width: '85%',
        overflow: 'hidden',
        paddingBottom: '5%',
        marginTop: '5%',
    },
    selectedCategoriesHeading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 18,
        color: platinum,
        paddingTop: '5%',
        paddingLeft: 10,
    },
    searchCategoriesHeading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 18,
        color: jet,
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
        fontSize: 15,
        color: jet,
        backgroundColor: yellowGreen,
        padding: 5,
        marginRight: 10,
    },
    selectedCategory: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 15,
        color: jet,
        backgroundColor: yellowGreen,
        padding: 5,
        marginLeft: 10,
        marginTop: '5%',
    },
    field: {
        alignSelf: 'flex-start',
        paddingLeft: 40,
        paddingTop: '7%',
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 25,
        color: platinum,
    },
    textInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 20,
        color: platinum,
        width: '80%',
        paddingTop: '5%',
        borderBottomColor: platinum,
        borderBottomWidth: 2,
        alignSelf: 'center',
    },
    descContainer: {
        backgroundColor: platinum,
        width: '80%',
        height: 250,
        borderRadius: 15,
        marginTop: '5%',
        padding: 10,
    },
    descTextInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: 18,
        color: jet,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        padding: 5,
        textAlignVertical: 'top',
    },
    launchButtonContainer: {
        paddingTop: '10%',
    },
    launchButton: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 25,
        color: yellowGreen,
    },
    textSection: {
        width: '70%',
        textAlign: 'center',
        paddingTop: '5%',
        paddingBottom: '20%',
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 14,
        color: platinum,
    },
})

export default AddProjectScreen
