import { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import JobCard from '../../components/cards/jobCard'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import jobType from '../../data/types/jobType'
import screens from '../params/screens'
import { MaterialCommunityIcons } from '@expo/vector-icons'

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
                        <MaterialCommunityIcons
                            name="chevron-left-circle"
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
                            Search for projects, jobs and users by their title
                            or category.
                        </Text>
                    </View>
                ) : (
                    <>
                        {loading !== true ? (
                            <>
                                {jobs.length === 0 ? (
                                    <View style={styles.noDataContainer}>
                                        <Text style={styles.noDataText}>
                                            No results were found, try searching
                                            for something else.
                                        </Text>
                                    </View>
                                ) : (
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
                                                description={job.description}
                                                creationDate={job.creationDate}
                                                category={job.category}
                                                showPlus={false}
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
    textInput: {
        fontFamily: 'IBMPlexSansCondensed-Medium',
        fontSize: fontSizes.INPUT,
        color: themeColors.WHITE,
        width: '80%',
        paddingTop: '5%',
        borderBottomColor: themeColors.WHITE,
        borderBottomWidth: 3,
        alignSelf: 'center',
    },
    subHeading: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.HEADING_TWO,
        color: themeColors.WHITE,
        marginTop: '5%',
        marginBottom: '5%',
        alignSelf: 'flex-start',
        paddingLeft: '10%',
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
        color: themeColors.WHITE,
        paddingTop: '5%',
        textAlign: 'center',
    },
})

export default SearchScreen
