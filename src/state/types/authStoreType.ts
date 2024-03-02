import userType from '../../data/types/userType'

type authStoreType = {
    currentUser: userType | null
    setCurrentUser: (currentUser: userType | null) => void
}

export default authStoreType
