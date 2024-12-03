import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ShopPage from "./Pages/ShopPage"
import OffersPage from "./Pages/OffersPage"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

import Verify from "./Pages/Verify"
import NotFound from "./Pages/Notfound"
import Accounts from "./Pages/Accounts"
import { useEffect } from "react"
import { useGetCurrUser } from "./hooks/useGetCurrUser"
import { setUser } from "./redux/features/userSlice/userSlice"
import Redirecting from "./Pages/Redirect"

import Owner from "./Pages/Owner"
import Seller from "./Pages/Seller"
import ProductDetailsPage from "./Pages/ProductDetails"
import { setCartItem } from "./redux/features/CartItemSlice/CartItemSlice"
import { useGetCartItems } from "./hooks/useGetCartItems"
import CheckoutPage from "./Pages/CheckoutPage"
import UserProtectedRoute from "./Components/ProtectedRoute/userProtectedRoute"
import OwnerProtectedRoute from "./Components/ProtectedRoute/ownerProtectedRoute"
import SellerProtectedRoute from "./Components/ProtectedRoute/sellerProtectedRoute"
import PaymentSuccess from "./Pages/PamentSuccessPage/PamentSuccess"

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)
  console.log("role print-", user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, cartResponse] = await Promise.all([
          useGetCurrUser(),
          useGetCartItems()
        ]);
        console.log(" cartItems appjs ", cartResponse);

        if (cartResponse.length) {
          dispatch(setCartItem(cartResponse));
        }
        const userObj = {
          firstName: userResponse?.user?.firstName,
          lastName: userResponse?.user?.lastName,
          email: userResponse?.user?.email || '',
          role: userResponse?.user?.role || null,
        };

        if (userResponse) {
          dispatch(setUser(userObj));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);


  const display = (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/redirecting" element={<Redirecting />} />
          <Route path="/productDetails" element={<ProductDetailsPage />} />

          {/* protected route */}
          <Route path="/account/*" element={
            <UserProtectedRoute>
              <Accounts />
            </UserProtectedRoute>
          } />

          <Route path="checkout" element={<CheckoutPage />} />

          {/* protected route */}
          <Route path="/owner/*" element={
              <OwnerProtectedRoute>
                <Owner />
              </OwnerProtectedRoute>
          } />

          <Route path="/seller/*" element={
              <SellerProtectedRoute>
                <Seller />
              </SellerProtectedRoute>
          } />
          <Route path='/seller' element={<NotFound />} />
          <Route path="/pamentSuccess" element={<PaymentSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
  return display
}
export default App