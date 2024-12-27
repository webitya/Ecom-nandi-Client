import { Route, Routes } from "react-router-dom"
import OwnerDashBoardEl from "../../Components/OwnerComponent/OwnerDashboardEl"
import OwnerPanditAll from "../../Components/OwnerComponent/OwnerPanditAll"
import OwnerSellerAll from "../../Components/OwnerComponent/OwnerSellerAll"
import SpecificPanditEl from "../../Components/OwnerComponent/SpecificPanditEl"
import SpecificSellerEl from "../../Components/OwnerComponent/SpecificSellerEl"
import RoleChngRequest from "../../Components/OwnerComponent/RoleChngRequest"
import ManageProductsEl from "../../Components/OwnerComponent/ManageProductsEl"
import AddProductHero from "../../Components/AddProductComp/addProductHeroEl"
import PanditBooking from "../../Components/OwnerComponent/OwnerPanditBooking"
import { useEffect, useState } from "react"
import { useData } from "../../hooks/useData"
import { Spin } from "antd"
import { setList } from "../../redux/features/ownerRedux/roleChangeSlice/roleChangeSlice"
import { setPanditList } from "../../redux/features/ownerRedux/totalPanditSlice/totalPanditSlice"
import { setSellerList } from "../../redux/features/ownerRedux/totalSellerSlice/totalSellerSlice"
import { updateDashboardValue } from "../../redux/features/ownerRedux/dashboardSlice/dashboardSlice"
import OwnerLayoutEl from "../../Shared/OwnerLayout"
import BusinessSetup from "../../Components/Business settings"
import BannerSetupEl from "../../Components/OwnerComponent/BannerSetupEl"
import CategorySetupEl from "../../Components/OwnerComponent/CategorySetupEl"
import OwnerOrdersEl from "../../Components/OwnerComponent/OwnerOrdersEl"
import { setProductList } from "../../redux/features/ownerRedux/totalProductSlice/totalProductSlice"

const Owner = () => {
  const [loader, setLoader] = useState(true);

  const { getData, dispatchActionPayload, dispatchActionObject } = useData();

  useEffect(() => {
    const fetchData = async () => {

      const [
        getAllUser, 
        pendingSellerRequests, 
        pendingPanditRequest, 
        allPandits, 
        allSelllers, 
        allProducts
      ] =
        await Promise.all([
          getData('api/user/allUser'),
          getData('api/role/getPendingSellerRequest'),
          getData('api/role/getPendingPanditRequest'),
          getData('api/owner/getAllPandit'),
          getData('api/owner/getAllSeller'),
          getData('api/product/getAllProducts')
        ]);

      dispatchActionObject(updateDashboardValue, {
        totalUser: getAllUser.data.length || getAllUser.data,
        totalpandit: allPandits.data.length,
        totalseller: allSelllers.data.length,
        totalPendingRequest: (pendingSellerRequests.data.length + pendingPanditRequest.data.length),
        totalProducts: allProducts.data.length,
        totalPanditBooking: 0
      })

      dispatchActionPayload(setList, [...pendingPanditRequest.data, ...pendingSellerRequests.data])
      dispatchActionPayload(setPanditList, [...allPandits.data])
      dispatchActionPayload(setSellerList, [...allSelllers.data])
      dispatchActionObject(setProductList, [...allProducts.data])

      setLoader(false)
    };

    fetchData();

  }, []);

  return (
    <OwnerLayoutEl>
      <div className="flex-[5] h-[calc(100vh-77px)] overflow-scroll">
        {
          loader
            ?
            <div className="w-screen h-[calc(100vh-77px)] flex justify-center items-center">
              <Spin size="larger" />
            </div>
            :
            <Routes>
              <Route path="/" element={<OwnerDashBoardEl />} />
              <Route path="/pandits" element={<OwnerPanditAll />} />
              <Route path="/sellers" element={<OwnerSellerAll />} />
              <Route path="/roleChangeRequest" element={<RoleChngRequest />} />
              <Route path="/panditBooking" element={<PanditBooking />} />
              <Route path="/manageProducts" element={<ManageProductsEl />} />
              <Route path="/addProduct" element={<AddProductHero />} />
              <Route path="/pandits/:id" element={<SpecificPanditEl />} />
              <Route path="/sellers/:id" element={<SpecificSellerEl />} />
              <Route path="/bussinessSetup"element={<BusinessSetup />} />
              <Route path="/manageOrders" element= {<OwnerOrdersEl />} />
              <Route path="/bannerSetup" element= {<BannerSetupEl />} />
              <Route path="/categorySetup" element= {<CategorySetupEl />} />
            </Routes>
        }
      </div>
    </OwnerLayoutEl>
  )
}
export default Owner;