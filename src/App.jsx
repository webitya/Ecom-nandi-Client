import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ShopPage from "./Pages/ShopPage"
import BookPandit from "./Pages/BookPanditPage"
import OffersPage from "./Pages/OffersPage"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import { Toaster } from "react-hot-toast"
import { useDispatch } from "react-redux"

import Verify from "./Pages/Verify"
import NotFound from "./Pages/Notfound"
import Accounts from "./Pages/Accounts"
import AddProduct from "./Pages/AddProduct"
import { useEffect } from "react"
import { useGetCurrUser } from "./hooks/useGetCurrUser"
import { setUser } from "./redux/features/userSlice/userSlice"
import Redirecting from "./Pages/Redirect"

import Owner from "./Pages/Owner"

import ProductDetailsPage from "./Pages/ProductDetails"


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await useGetCurrUser();

      const userObj = {
        fname: response?.user.name.split(' ')[0] || '',
        lname: response?.user.name.split(' ')[1] || '',
        email: response?.user.email || '',
        role: response?.user.role || null
      }

      if (response) {
        dispatch(
          setUser(userObj)
        )
      }
    }
    fetchData()
  }, []);

  const display = (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/book-pandit" element={<BookPandit />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<Verify />} />
          <Route path="/account" element={<Accounts />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/redirecting" element={<Redirecting />} />

          <Route path="/owner" element={<Owner />} />

          <Route path="/productDetails" element={<ProductDetailsPage />} />

        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
  return display
}
export default App