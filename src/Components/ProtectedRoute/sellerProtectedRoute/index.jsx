import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
    const user = useSelector( state => state.user.value)

    if(!(user.role === "seller"))
        return <Navigate to={"/*"} />

    return children;
}

export default SellerProtectedRoute;