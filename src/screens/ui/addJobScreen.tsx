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
import * as Crypto from 'expo-crypto'
import * as Progress from 'react-native-progress'
import DatePicker from 'react-native-date-picker'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import categories from '../../enums/categories'
import screens from '../params/screens'
import addJobScreenProps from '../props/addJobScreenProps'

const AddJobScreen = ({ route }: addJobScreenProps) => {
    const { projectId, projectName, jobCreatorId, jobCreator } = route.params

    const [name, setName] = useState<string>('')
    const [enteredCategory, setEnteredCategory] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [searchResults, setSearchResults] = useState<string[]>([])
    const [jobDeadline, setJobDeadline] = useState<string>('')
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [paymentAmount, setPaymentAmount] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const randomUUID = Crypto.randomUUID()

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
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <MaterialCommunityIcons
                                    name="chevron-left-circle"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                />
                            </TouchableOpacity>
                            <Text style={styles.heading}>New Job</Text>
                        </View>
                        <View style={styles.mainSection}>
                            <Text style={styles.field}>Job Title</Text>
                            <TextInput
                                placeholder="App Developer"
                                value={name}
                                onChangeText={setName}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                autoCapitalize="words"
                                inputMode="text"
                            />
                            <Text style={styles.field}>Job Category</Text>
                            <TextInput
                                placeholder="App Development"
                                value={enteredCategory}
                                onChangeText={setEnteredCategory}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                autoCapitalize="words"
                                inputMode="text"
                            />
                            <View style={styles.categoryContainer}>
                                <Text style={styles.categoriesHeading}>
                                    Available Categories
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
                                                    setSelectedCategory(
                                                        category
                                                    )
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
                                <View style={styles.categoryContainer}>
                                    <Text style={styles.categoriesHeading}>
                                        Selected Category
                                    </Text>
                                    <Text style={styles.selectedCategory}>
                                        {selectedCategory}
                                    </Text>
                                </View>
                            ) : null}
                            <Text style={styles.field}>
                                Payment Amount ($$$/day)
                            </Text>
                            <TextInput
                                placeholder="$120"
                                value={paymentAmount}
                                onChangeText={setPaymentAmount}
                                style={styles.textInput}
                                placeholderTextColor={themeColors.SILVER}
                                inputMode="decimal"
                            />
                            <Text style={styles.field}>
                                Deadline (optional)
                            </Text>
                            <TouchableOpacity
                                style={styles.datePickerButtonContainer}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text style={styles.button}>Set Deadline</Text>
                            </TouchableOpacity>
                            <DatePicker
                                modal
                                mode="date"
                                date={new Date()}
                                open={showDatePicker}
                                onConfirm={(date) => {
                                    setJobDeadline(
                                        date.toString().substring(4, 15)
                                    )
                                    setShowDatePicker(false)
                                }}
                                onCancel={() => {
                                    setShowDatePicker(false)
                                }}
                            />
                            {jobDeadline ? (
                                <>
                                    <Text style={styles.selectedDeadline}>
                                        {jobDeadline}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.datePickerButtonContainer}
                                        onPress={() => (
                                            setShowDatePicker(false),
                                            setJobDeadline('')
                                        )}
                                    >
                                        <Text style={styles.button}>Reset</Text>
                                    </TouchableOpacity>
                                </>
                            ) : null}
                            <Text style={styles.field}>Description</Text>
                            <View style={styles.descContainer}>
                                <TextInput
                                    placeholder="Describe your job's goal, types of skills required, and any other relevant details."
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
                                        paymentAmount !== '' &&
                                        desc !== ''
                                    ) {
                                        setLoading(true)
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
                                Once this job is created, it can be viewed by
                                others. These details can be edited later on
                                until someone is hired for this job.
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
    categoryContainer: {
        overflow: 'hidden',
        paddingTop: '5%',
        alignItems: 'flex-start',
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
        padding: '1%',
        marginRight: 10,
    },
    selectedCategory: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.BLACK,
        backgroundColor: themeColors.YELLOW_GREEN,
        padding: '1%',
        marginTop: '5%',
    },
    datePickerButtonContainer: {
        paddingTop: '5%',
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
        overflow: 'visible',
        padding: 5,
        textAlignVertical: 'top',
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

export default AddJobScreen
