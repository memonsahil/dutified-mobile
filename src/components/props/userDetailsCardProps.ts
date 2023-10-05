import categories from '../../enums/categories'

type userDetailsCardProps = {
    interests: categories[]
    description: string
    dailyRate: string
    links: { id: string; url: string }[]
}

export default userDetailsCardProps
