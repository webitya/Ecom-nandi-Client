import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./Pages/HomePage";
import ShopPage from "./Pages/ShopPage";
import OffersPage from "./Pages/OffersPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Toaster } from "react-hot-toast";
import Verify from "./Pages/Verify";
import NotFound from "./Pages/Notfound";
import Accounts from "./Pages/Accounts";
import { useEffect, useState } from "react";
import Redirecting from "./Pages/Redirect";
import Owner from "./Pages/Owner";
import Seller from "./Pages/Seller";
import ProductDetailsPage from "./Pages/ProductDetails";
import CheckoutPage from "./Pages/CheckoutPage";
import UserProtectedRoute from "./Components/ProtectedRoute/userProtectedRoute";
import OwnerProtectedRoute from "./Components/ProtectedRoute/ownerProtectedRoute";
import SellerProtectedRoute from "./Components/ProtectedRoute/sellerProtectedRoute";
import PaymentSuccess from "./Pages/PamentSuccessPage/PamentSuccess";
import { Spin } from "antd";
import DynamicPages from "./Shared/DynamicPage";
import DynamicSinglePage from "./Shared/DynamicSingle";

const App = () => {
  const [loader, setLoader] = useState(true);
  const pages = useSelector((state) => state.pages.pages || {}); // Fetch dynamic pages

  useEffect(() => {
    // Simulate loader for initial setup
    setTimeout(() => setLoader(false), 1000);
  }, []);

  return (
    <>
      {loader ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
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
            <Route
              path="/account/*"
              element={
                <UserProtectedRoute>
                  <Accounts />
                </UserProtectedRoute>
              }
            />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/owner/*"
              element={
                <OwnerProtectedRoute>
                  <Owner />
                </OwnerProtectedRoute>
              }
            />
            <Route
              path="/seller/*"
              element={
                <SellerProtectedRoute>
                  <Seller />
                </SellerProtectedRoute>
              }
            />
            <Route path="/paymentSuccess" element={<PaymentSuccess />} />
            <Route path="/dynamic-pages" element={<DynamicPages />} />
            <Route path="*" element={<NotFound />} />

            {/* Dynamic Routes */}
            {Object.entries(pages).map(([pageKey, page]) => (
              <Route
                key={pageKey}
                path={page.route}
                element={<DynamicSinglePage pageKey={pageKey} />}
              />
            ))}
          </Routes>
          <Toaster />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
