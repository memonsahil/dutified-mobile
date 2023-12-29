import { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as Progress from 'react-native-progress'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import attachment from '../../enums/attachment'
import globalStore from '../../state/stores/globalStore'

const AddPostScreen = () => {
    const [desc, setDesc] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { selectedAttachments, setSelectedAttachments } = globalStore(
        (state) => state
    )

    const navigation: NavigationProp<screens> = useNavigation()

    return (
        <View style={styles.container}>
            {loading === false ? (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        contentContainerStyle={styles.scrollView}
                    >
                        <View style={styles.headerSection}>
                            <View style={styles.headerLeft}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedAttachments([])
                                        navigation.goBack()
                                    }}
                                >
                                    <MaterialCommunityIcons
                                        name="chevron-left-circle"
                                        size={30}
                                        color={themeColors.YELLOW_GREEN}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.heading}>New Post</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Attach')}
                            >
                                <MaterialCommunityIcons
                                    name="file-plus"
                                    size={30}
                                    color={themeColors.YELLOW_GREEN}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mainSection}>
                            <View style={styles.descContainer}>
                                <TextInput
                                    placeholder="Describe your post, attach any projects or jobs that you have created, and add any other details that you want to share with your network."
                                    value={desc}
                                    onChangeText={setDesc}
                                    style={styles.descTextInput}
                                    placeholderTextColor={themeColors.SILVER}
                                    inputMode="text"
                                    multiline
                                />
                            </View>
                            {selectedAttachments?.length !== 0
                                ? selectedAttachments?.map(
                                      (selectedAttachment) => (
                                          <View
                                              key={selectedAttachment.id}
                                              style={styles.attachmentContainer}
                                          >
                                              <TouchableOpacity
                                                  onPress={() => {
                                                      selectedAttachment.type ===
                                                      attachment.JOB
                                                          ? navigation.navigate(
                                                                'Job',
                                                                {
                                                                    jobId: selectedAttachment.id,
                                                                }
                                                            )
                                                          : navigation.navigate(
                                                                'Project',
                                                                {
                                                                    projectId:
                                                                        selectedAttachment.id,
                                                                }
                                                            )
                                                  }}
                                              >
                                                  <Text
                                                      style={styles.attachment}
                                                      numberOfLines={1}
                                                      ellipsizeMode="tail"
                                                  >
                                                      {selectedAttachment.title}
                                                  </Text>
                                              </TouchableOpacity>
                                              <TouchableOpacity
                                                  onPress={() => {
                                                      setSelectedAttachments(
                                                          selectedAttachments.filter(
                                                              (_attachment) =>
                                                                  _attachment.id !==
                                                                  selectedAttachment.id
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
                                  )
                                : null}
                            <TouchableOpacity
                                onPress={() => {
                                    if (desc !== '') {
                                        setLoading(true)
                                    } else {
                                        Alert.alert(
                                            'Missing Content',
                                            'Please describe yout post before submitting it.',
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
                                <Text style={styles.button}>Post</Text>
                            </TouchableOpacity>
                            <Text style={styles.textSection}>
                                Once this post is created, it can be viewed by
                                others in your network. You can not edit or
                                delete it later.
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
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row',
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
        marginTop: '5%',
    },
    descContainer: {
        backgroundColor: themeColors.WHITE,
        height: 250,
        borderRadius: 20,
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
    attachmentContainer: {
        marginTop: '7%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    attachment: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BODY_TWO,
        color: themeColors.YELLOW_GREEN,
        textDecorationLine: 'underline',
        width: 275,
        overflow: 'hidden',
    },
    button: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
        alignSelf: 'center',
        paddingTop: '10%',
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

export default AddPostScreen
