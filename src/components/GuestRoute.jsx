import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export const GuestRoute = ({children}) => {
    const {user} = useAuth()

    if(user) return <Navigate to={ user?.role === 'admin' ? '/admin' : '/' } />

    return children
}