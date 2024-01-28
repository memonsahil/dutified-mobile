import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import {
    manipulateAsync,
    SaveFormat,
    ImageResult,
} from 'expo-image-manipulator'
import * as Progress from 'react-native-progress'
import { Avatar } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import themeColors from '../../enums/themeColors'
import fontSizes from '../../enums/fontSizes'
import screens from '../params/screens'
import authStore from '../../state/stores/authStore'
import authUser from '../../data/classes/authUser'
import promiseType from '../../data/types/promiseType'
import requestStatus from '../../enums/requestStatus'

const EditProfilePictureScreen = () => {
    let formattedImage: ImageResult
    const [image, setImage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { currentUser, setCurrentUser } = authStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        currentUser?.profile.profilePicture &&
        currentUser?.profile.profilePicture !== image
            ? setImage(currentUser?.profile.profilePicture)
            : setImage('')
    }, [currentUser?.profile.profilePicture])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            formattedImage = await manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: 400, height: 400 } }],
                { compress: 1, format: SaveFormat.PNG, base64: true }
            )

            setImage('data:image/png;base64,' + formattedImage.base64)
        }
    }

    return (
        <View style={styles.container}>
            {loading === false ? (
                <>
                    <View style={styles.headerSection}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialCommunityIcons
                                name="chevron-left-circle"
                                size={26}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Profile Picture</Text>
                    </View>
                    <Avatar
                        size="xlarge"
                        rounded
                        source={
                            image !== ''
                                ? { uri: image }
                                : require('../../../assets/images/user-avatar.png')
                        }
                        containerStyle={styles.avatarContainer}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => pickImage()}
                            style={styles.buttonWrapper}
                        >
                            <MaterialCommunityIcons
                                name="file-image-plus"
                                size={26}
                                color={themeColors.YELLOW_GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.saveButton}>Upload</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setLoading(true)
                                authUser
                                    .setProfilePicture({
                                        profilePicture: image,
                                    })
                                    .then((response: promiseType) => {
                                        if (
                                            response.status ===
                                            requestStatus.SUCCESS
                                        ) {
                                            currentUser && currentUser.profile
                                                ? setCurrentUser({
                                                      ...currentUser,
                                                      profile: {
                                                          ...currentUser.profile,
                                                          profilePicture: image,
                                                      },
                                                  })
                                                : null
                                            setLoading(false)
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
                            style={styles.buttonWrapper}
                        >
                            <MaterialCommunityIcons
                                name="content-save"
                                size={26}
                                color={themeColors.YELLOW_GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.saveButton}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setLoading(true)
                                authUser
                                    .setProfilePicture({
                                        profilePicture: '',
                                    })
                                    .then((response: promiseType) => {
                                        if (
                                            response.status ===
                                            requestStatus.SUCCESS
                                        ) {
                                            currentUser && currentUser.profile
                                                ? setCurrentUser({
                                                      ...currentUser,
                                                      profile: {
                                                          ...currentUser.profile,
                                                          profilePicture: '',
                                                      },
                                                  })
                                                : null
                                            setLoading(false)
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
                            style={styles.buttonWrapper}
                        >
                            <MaterialCommunityIcons
                                name="square-edit-outline"
                                size={26}
                                color={themeColors.YELLOW_GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.saveButton}>Reset</Text>
                        </TouchableOpacity>
                    </View>
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
    avatarContainer: {
        backgroundColor: themeColors.YELLOW_GREEN,
        marginTop: '10%',
        alignSelf: 'center',
    },
    buttonContainer: {
        marginTop: '10%',
        height: '20%',
        justifyContent: 'space-between',
        marginLeft: '28%',
    },
    buttonWrapper: {
        flexDirection: 'row',
    },
    iconButton: {
        marginRight: '3%',
        paddingLeft: '10%',
    },
    saveButton: {
        fontFamily: 'IBMPlexSansCondensed-Bold',
        fontSize: fontSizes.BUTTON,
        color: themeColors.YELLOW_GREEN,
    },
})

export default EditProfilePictureScreen
