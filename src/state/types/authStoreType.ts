import authUserType from '../../data/types/authUserType'

type authStoreType = {
    currentUser: authUserType | null
    setCurrentUser: (currentUser: authUserType | null) => void
}

export default authStoreType
