import feedbackType from '../data/types/feedbackType'
import linkType from '../data/types/linkType'
import * as Crypto from 'expo-crypto'
import * as ImagePicker from 'expo-image-picker'
import {
    manipulateAsync,
    SaveFormat,
    ImageResult,
} from 'expo-image-manipulator'

class Util {
    avgRating = (feedbacks: feedbackType[]) =>
        Math.round(
            feedbacks.reduce(
                (total, feedback) => total + parseInt(feedback.rating),
                0
            ) / feedbacks.length
        ).toString()

    formatLinks = (links: string[]) => {
        const formattedLinks: linkType[] = []
        links.forEach((link) => {
            formattedLinks.push({ id: Crypto.randomUUID(), url: link })
        })

        return formattedLinks
    }

    pickImage = async (setter: (uri: string) => void) => {
        let formattedImage: ImageResult

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

            setter('data:image/png;base64,' + formattedImage.base64)
        }
    }

    searchCategories = (
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
}
export default new Util()
