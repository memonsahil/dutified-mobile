import feedbackType from '../data/types/feedbackType'
import linkType from '../data/types/linkType'
import * as Crypto from 'expo-crypto'

const avgRating = (feedbacks: feedbackType[]) =>
    Math.round(
        feedbacks.reduce(
            (total, feedback) => total + parseInt(feedback.rating),
            0
        ) / feedbacks.length
    ).toString()

const formatLinks = (links: string[]) => {
    const formattedLinks: linkType[] = []
    links.forEach((link) => {
        formattedLinks.push({ id: Crypto.randomUUID(), url: link })
    })

    return formattedLinks
}

export { avgRating, formatLinks }
