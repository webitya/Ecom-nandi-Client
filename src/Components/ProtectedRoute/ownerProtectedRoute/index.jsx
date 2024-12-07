import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const OwnerProtectedRoute = ({children}) => {
    const user= useSelector(state => state.user.value);

    if(!user.role){
        return <Navigate to={"/login"} />
    }

    if(!(user.role === 'owner')){
        return <Navigate to={"/login"} />
    }

    return children;
}

export default OwnerProtectedRoute;