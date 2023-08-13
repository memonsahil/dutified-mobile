import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import AuthUser from '../data/authUser'
import useAuthStore from '../stores/useAuthUserStore'
import * as ImagePicker from 'expo-image-picker'
import {
    manipulateAsync,
    SaveFormat,
    ImageResult,
} from 'expo-image-manipulator'
import * as Progress from 'react-native-progress'
import { Avatar } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { raisinBlack, yellowGreen, platinum } from '../theme/colors'
import screens from '../types/params/screens'

const EditProfilePictureScreen = () => {
    let formattedImage: ImageResult
    const [image, setImage] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const { userDetails, updateImage } = useAuthStore((state) => state)

    const navigation: NavigationProp<screens> = useNavigation()

    useEffect(() => {
        userDetails.imageSrc !== image ? setImage(userDetails.imageSrc) : null
    }, [userDetails.imageSrc])

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
                            <AntDesign
                                name="caretleft"
                                size={30}
                                color={yellowGreen}
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
                                : require('../../assets/images/user-avatar.png')
                        }
                        containerStyle={styles.avatarContainer}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => pickImage()}>
                            <Text style={styles.saveButton}>Upload</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setLoading(true)

                                AuthUser.setImage(image)
                                    .then(() => {
                                        updateImage(image)

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
                            }}
                        >
                            <Text style={styles.saveButton}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setLoading(true)

                                AuthUser.setImage('')
                                    .then(() => {
                                        updateImage('')

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
                            }}
                        >
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
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    avatarContainer: {
        backgroundColor: yellowGreen,
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: '15%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    saveButton: {
        fontFamily: 'IBMPlexSansCondensed-SemiBold',
        fontSize: 25,
        color: yellowGreen,
    },
})

export default EditProfilePictureScreen
