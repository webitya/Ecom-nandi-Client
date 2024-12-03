import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const OwnerProtectedRoute = ({children}) => {
    const { role }= useSelector(state => state.user.value);
    console.log(role)

    if(!(role === 'owner'))
        return <Navigate to={"/*"} />
    
    return children;
}

export default OwnerProtectedRoute;