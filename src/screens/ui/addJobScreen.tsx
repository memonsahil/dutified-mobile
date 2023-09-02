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
import { AntDesign } from '@expo/vector-icons'
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
                    >
                        <View style={styles.headerSection}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                            >
                                <AntDesign
                                    name="caretleft"
                                    size={30}
                                    color={themeColors.AVACADO}
                                />
                            </TouchableOpacity>
                            <Text style={styles.heading}>New Job</Text>
                        </View>
                        <Text style={styles.field}>Name</Text>
                        <TextInput
                            placeholder="Give your job a name."
                            value={name}
                            onChangeText={setName}
                            style={styles.textInput}
                            placeholderTextColor={themeColors.SILVER}
                            inputMode="text"
                        />
                        <Text style={styles.field}>Category</Text>
                        <TextInput
                            placeholder="Search for a category."
                            value={enteredCategory}
                            onChangeText={setEnteredCategory}
                            style={styles.textInput}
                            placeholderTextColor={themeColors.SILVER}
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
                        <Text style={styles.field}>Payment (USD)</Text>
                        <TextInput
                            placeholder="$200"
                            value={paymentAmount}
                            onChangeText={setPaymentAmount}
                            style={styles.textInput}
                            placeholderTextColor={themeColors.SILVER}
                            inputMode="decimal"
                        />
                        <Text style={styles.field}>Deadline</Text>
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
                                setJobDeadline(date.toString().substring(4, 15))
                                setShowDatePicker(false)
                            }}
                            onCancel={() => {
                                setShowDatePicker(false)
                            }}
                        />
                        {jobDeadline ? (
                            <Text style={styles.selectedDeadline}>
                                {jobDeadline}
                            </Text>
                        ) : null}
                        <Text style={styles.field}>Description</Text>
                        <View style={styles.descContainer}>
                            <TextInput
                                placeholder="Describe your job's goal, types of skills required etc."
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
                                    jobDeadline !== '' &&
                                    desc !== ''
                                ) {
                                    setLoading(true)
                                } else {
                                    Alert.alert(
                                        'Missing Details',
                                        'Please enter all of your details before creating your job.',
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
                            Once your job is created, it can be viewed by other
                            users and these details cannot be changed later.
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
                        color={themeColors.AVACADO}
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
        paddingLeft: 30,
        paddingRight: 30,
        height: 150,
        width: 400,
        alignItems: 'center',
    },
    heading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.WHITE,
        paddingLeft: 20,
        paddingRight: 30,
    },
    field: {
        alignSelf: 'flex-start',
        paddingLeft: 40,
        paddingTop: '7%',
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.WHITE,
    },
    textInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '80%',
        paddingTop: '5%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 2,
        alignSelf: 'center',
    },
    selectedContainer: {
        width: '85%',
        overflow: 'hidden',
        alignItems: 'flex-start',
    },
    searchContainer: {
        backgroundColor: themeColors.WHITE,
        borderRadius: 15,
        width: '85%',
        overflow: 'hidden',
        paddingBottom: '5%',
        marginTop: '5%',
    },
    selectedCategoriesHeading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        paddingTop: '5%',
        paddingLeft: 10,
    },
    searchCategoriesHeading: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
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
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.WHITE,
        backgroundColor: themeColors.AVACADO,
        padding: 5,
        marginRight: 10,
    },
    selectedCategory: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.WHITE,
        backgroundColor: themeColors.AVACADO,
        padding: 5,
        marginLeft: 10,
        marginTop: '5%',
    },
    datePickerButtonContainer: {
        paddingTop: '5%',
    },
    selectedDeadline: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
        marginTop: '5%',
    },
    descContainer: {
        backgroundColor: themeColors.WHITE,
        width: '80%',
        height: 250,
        borderRadius: 15,
        marginTop: '5%',
        padding: 10,
    },
    descTextInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.WHITE,
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
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.AVACADO,
    },
    textSection: {
        width: '70%',
        textAlign: 'center',
        paddingTop: '5%',
        paddingBottom: '20%',
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.BODY_THREE,
        color: themeColors.WHITE,
    },
})

export default AddJobScreen
