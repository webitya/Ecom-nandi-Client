import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const OwnerProtectedRoute = ({children}) => {
    const user= useSelector(state => state.user.value);
    console.log("rolejdvaGSDHJSBDAA")

    if(!(user.role === 'owner')){
        // return <Navigate to={"/login"} />
        console.log(user)
    }
    
    return children;
}

export default OwnerProtectedRoute;