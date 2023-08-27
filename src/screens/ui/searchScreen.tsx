import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import JobCard from '../../components/cards/jobCard'
import { AntDesign } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import jobType from '../../data/types/jobType'
import screens from '../../params/screens'

const SearchScreen = () => {
    const [searchText, setSearchText] = useState('')
    const [jobs, setJobs] = useState<jobType[]>([])
    const [loading, setLoading] = useState(false)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        if (searchText !== '') {
            setLoading(true)
        }
    }, [searchText])

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign
                            name="caretleft"
                            size={30}
                            color={themeColors.YELLOW_GREEN}
                        />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Search</Text>
                </View>
                <TextInput
                    placeholder="App Development"
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.textInput}
                    placeholderTextColor={themeColors.SILVER}
                    inputMode="text"
                />
                {searchText === '' ? (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>
                            Search for projects and jobs by their name or
                            category.
                        </Text>
                    </View>
                ) : (
                    <>
                        {loading !== true ? (
                            <>
                                {jobs.length === 0 ? (
                                    <View style={styles.noDataContainer}>
                                        <Text style={styles.noDataText}>
                                            No jobs were found, try searching
                                            for something else.
                                        </Text>
                                    </View>
                                ) : null}
                                {jobs.length === 0 ? null : (
                                    <>
                                        <Text style={styles.subHeading}>
                                            Jobs
                                        </Text>
                                        {jobs.map((job) => (
                                            <JobCard
                                                key={job.jobId}
                                                nav={navigation}
                                                jobId={job.jobId}
                                                jobName={job.jobName}
                                                status={job.status}
                                                payment={job.payment}
                                                jobDesc={job.description}
                                                deadline={job.dueDate}
                                            />
                                        ))}
                                    </>
                                )}
                                <View style={styles.bottomSpacer} />
                            </>
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
                    </>
                )}
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themeColors.RAISIN_BLACK,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '50%',
    },
    scrollView: {
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
        color: themeColors.PLATINUM,
        paddingLeft: 20,
        paddingRight: 30,
    },
    textInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.PLATINUM,
        width: '80%',
        paddingTop: '5%',
        borderBottomColor: themeColors.PLATINUM,
        borderBottomWidth: 2,
        alignSelf: 'center',
    },
    subHeading: {
        alignSelf: 'flex-start',
        paddingLeft: 30,
        paddingTop: 20,
        marginBottom: 20,
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.PLATINUM,
    },
    horizontalSection: {
        paddingRight: 30,
    },
    bottomSpacer: {
        paddingBottom: '20%',
    },
    noDataContainer: {
        alignItems: 'center',
        width: '80%',
        paddingTop: 20,
    },
    noDataText: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.BODY_ONE,
        color: themeColors.PLATINUM,
        paddingTop: '5%',
        textAlign: 'center',
    },
})

export default SearchScreen
