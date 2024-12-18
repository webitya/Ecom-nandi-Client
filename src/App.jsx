import DynamicPages from "./Shared/DynamicPage";
import DynamicSinglePage from "./Shared/DynamicSingle";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import ShopPage from "./Pages/ShopPage"
import OffersPage from "./Pages/OffersPage"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

import Verify from "./Pages/Verify"
import NotFound from "./Pages/Notfound"
import Accounts from "./Pages/Accounts"
import { useEffect, useState } from "react"
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
import { Spin } from "antd"
import { useRequestApi } from "./hooks/useRequestApi";
import { setBanners } from "./redux/features/bannerSlice/bannerSlice";
import { setCategory } from "./redux/features/CategorySlice/categorySlice";
import BlogManager from "./Shared/BlogManager";
import BlogListEl from "./Shared/BlogListEl";
import BlogDetailEl from "./Shared/BlogDetail";
import TermsConditionsHero from "./CompanyPages/TermsConditions/TermsConditionsHero";
import PrivacyPoliciesHero from "./CompanyPages/PrivacyPolicy/PrivacyPolicyHero";
import AboutUsHero from "./CompanyPages/AboutUs/AboutUsHero";
import ContactUsHero from "./CompanyPages/ContactUs/ContactUsHero";
import { useGetBanner } from "./hooks/useGetBanner";
import { useGetCategory } from "./hooks/useGetCategory";

const App = () => {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(true)

  const pages = useSelector((state) => state.pages.pages || {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, cartResponse, responseBanners, fetchCategory] = await Promise.all([
          useGetCurrUser(),
          useGetCartItems(),
          useGetBanner(),
          useGetCategory()
        ]);

        console.log(responseBanners);    

        if (cartResponse.length) {
          dispatch(setCartItem(cartResponse));
        }

        if(responseBanners){
          dispatch(setBanners(responseBanners.banner))
        }

        if(fetchCategory.category.length){
          dispatch(setCategory(fetchCategory.category))
        }

        const userObj = {
          firstName: userResponse?.user?.firstName,
          lastName: userResponse?.user?.lastName,
          email: userResponse?.user?.email || "",
          role: userResponse?.user?.role || null,
        };

        if (userResponse) {
          dispatch(setUser(userObj));
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        
      } finally {
        setLoader(false);
      }
    };

    fetchData();

  }, [dispatch]);

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
            <Route path="/create-blog" element={<BlogManager />} />
            <Route path="/blogs" element={<BlogListEl />} />
            <Route path="/blog/:slug" element={<BlogDetailEl />} />
            <Route path="about-us" element={<AboutUsHero/>}/>
            <Route path="contact-us" element={<ContactUsHero/>}/>
            <Route path="privacy-policies" element={<PrivacyPoliciesHero/>}/>
            <Route path="terms-conditions" element={<TermsConditionsHero/>}/>
            {/* protected route */}
            <Route
              path="/account/*"
              element={
                <UserProtectedRoute>
                  <Accounts />
                </UserProtectedRoute>
              }
            />

            <Route path="checkout" element={<CheckoutPage />} />

            {/* protected route */}
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
            <Route path="/seller" element={<NotFound />} />
            <Route path="/pamentSuccess" element={<PaymentSuccess />} />
            <Route path="*" element={<NotFound />} />

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
