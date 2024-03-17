import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import categories from '../../enums/categories'
import screens from '../params/screens'
import util from '../../util/util'
import * as Crypto from 'expo-crypto'
import authStore from '../../state/stores/authStore'
import promiseType from '../../data/types/promiseType'
import requestStatus from '../../enums/requestStatus'
import project from '../../data/classes/project'

const AddProjectScreen = () => {
    const projectId = Crypto.randomUUID()
    const [name, setName] = useState<string>('')
    const [enteredCategory, setEnteredCategory] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [searchResults, setSearchResults] = useState<string[]>([])
    const [desc, setDesc] = useState<string>('')
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
                                    size={28}
                                    color={themeColors.GREEN}
                                />
                            </TouchableOpacity>
                            <Text style={styles.heading}>New Project</Text>
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>Title</Text>
                            <TextInput
                                placeholder="Update Backend API"
                                value={name}
                                onChangeText={setName}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                autoCapitalize="words"
                                inputMode="text"
                            />
                            <Text style={styles.field}>Category</Text>
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
                            {selectedCategory !== '' ? (
                                <>
                                    <Text style={styles.categoriesHeading}>
                                        Selected
                                    </Text>
                                    <Text style={styles.selectedCategory}>
                                        {selectedCategory}
                                    </Text>
                                </>
                            ) : null}
                            <Text style={styles.field}>Description</Text>
                            <View style={styles.descContainer}>
                                <TextInput
                                    placeholder="Describe your project's goal, types of skills required, and any other relevant details."
                                    value={desc}
                                    onChangeText={setDesc}
                                    style={styles.descTextInput}
                                    placeholderTextColor={themeColors.SILVER}
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
                                        project
                                            .createProject({
                                                project: {
                                                    projectId: projectId,
                                                    projectName: name,
                                                    projectCreatorId:
                                                        currentUser?.profile
                                                            .userId!,
                                                    projectCreator:
                                                        currentUser?.profile
                                                            .firstName! +
                                                        ' ' +
                                                        currentUser?.profile
                                                            .lastName!,
                                                    category: selectedCategory,
                                                    description: desc,
                                                    creationDate:
                                                        new Date().toDateString(),
                                                    jobs: [],
                                                },
                                            })
                                            .then((response: promiseType) => {
                                                if (
                                                    response.status ===
                                                    requestStatus.SUCCESS
                                                ) {
                                                    currentUser &&
                                                    currentUser.projectsCreated
                                                        ? setCurrentUser({
                                                              ...currentUser,
                                                              projectsCreated: [
                                                                  ...currentUser.projectsCreated,
                                                                  {
                                                                      projectId:
                                                                          projectId,
                                                                      projectName:
                                                                          name,
                                                                      projectCreatorId:
                                                                          currentUser
                                                                              ?.profile
                                                                              .userId!,
                                                                      projectCreator:
                                                                          currentUser
                                                                              ?.profile
                                                                              .firstName! +
                                                                          ' ' +
                                                                          currentUser
                                                                              ?.profile
                                                                              .lastName!,
                                                                      category:
                                                                          selectedCategory,
                                                                      description:
                                                                          desc,
                                                                      creationDate:
                                                                          new Date().toDateString(),
                                                                      jobs: [],
                                                                  },
                                                              ],
                                                          })
                                                        : null
                                                    navigation.navigate('Work')
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
                                            })
                                    } else {
                                        Alert.alert(
                                            'Missing Details',
                                            'Please complete all required fields before proceeding.',
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
                                <Text style={styles.button}>Create</Text>
                            </TouchableOpacity>
                            <Text style={styles.textSection}>
                                Once this project is created, it will be viewed
                                by others. You can archive it later.
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
        borderBottomWidth: 1,
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
    selectedCategory: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.GREEN,
        padding: '1%',
        marginTop: '5%',
        alignSelf: 'flex-start',
    },
    selectedDeadline: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        marginTop: '5%',
        alignSelf: 'center',
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
        overflow: 'scroll',
        padding: 5,
        textAlignVertical: 'top',
    },
    launchButtonContainer: {
        paddingTop: '10%',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.GREEN,
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

export default AddProjectScreen
