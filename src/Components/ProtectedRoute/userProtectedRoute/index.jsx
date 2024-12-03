import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const UserProtectedRoute = ({children}) => {
    const role= useSelector(state => state.user.value.role)

    if(!role) 
        return <Navigate to={"/login"} />
    
    return children;
}

export default UserProtectedRoute;