import linkType from '../../data/types/linkType'
import categories from '../../enums/categories'

type userDetailsCardProps = {
    interests: categories[]
    description: string
    dailyRate: string
    links: linkType[]
}

export default userDetailsCardProps
