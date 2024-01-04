import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
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

const EditProfilePictureScreen = () => {
    let formattedImage: ImageResult
    const [image, setImage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const profile = {
        profilePicture: '',
    }

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        profile.profilePicture !== image
            ? setImage(profile.profilePicture)
            : null
    }, [profile.profilePicture])

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
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                            />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Profile Picture</Text>
                    </View>
                    <Avatar
                        size="xlarge"
                        rounded
                        source={
                            image
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
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.saveButton}>Upload</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setLoading(true)
                            }}
                            style={styles.buttonWrapper}
                        >
                            <MaterialCommunityIcons
                                name="content-save"
                                size={30}
                                color={themeColors.YELLOW_GREEN}
                                style={styles.iconButton}
                            />
                            <Text style={styles.saveButton}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {}}
                            style={styles.buttonWrapper}
                        >
                            <MaterialCommunityIcons
                                name="square-edit-outline"
                                size={30}
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
