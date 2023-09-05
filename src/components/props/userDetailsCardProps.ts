import categories from '../../enums/categories'

type userDetailsCardProps = {
    interests: categories[]
    description: string
    hourlyRate: string
    links: { id: string; url: string }[]
}

export default userDetailsCardProps
