import { useContext } from 'react'
import AuthContext from 'app/contexts/JWTAuthContextOriginal'

const useAuth = () => useContext(AuthContext)

export default useAuth
