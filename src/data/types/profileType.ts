import categories from '../../enums/categories'

type profileType = {
    userId: string
    firstName: string
    lastName: string
    profilePicture: string
    bio: string
    ratePerDay: string
    interests: categories[]
    links: string[]
    countryCode: string
    phoneNumber: string
    emailAddress: string
}

export default profileType
