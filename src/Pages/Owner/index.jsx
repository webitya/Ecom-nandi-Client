import { Route, Routes } from "react-router-dom"
import LayoutEl from "../../Shared/LayoutEl"
import OwnerDashBoardEl from "../../Components/OwnerComponent/OwnerDashboardEl"
import OwnerPanditAll from "../../Components/OwnerComponent/OwnerPanditAll"
import OwnerSellerAll from "../../Components/OwnerComponent/OwnerSellerAll"
import SpecificPanditEl from "../../Components/OwnerComponent/SpecificPanditEl"
import SpecificSellerEl from "../../Components/OwnerComponent/SpecificSellerEl"
import RoleChngRequest from "../../Components/OwnerComponent/RoleChngRequest"
import ManageProductsEl from "../../Components/OwnerComponent/ManageProductsEl"
import AddProductHero from "../../Components/AddProductComp/addProductHeroEl"
import PanditBooking from "../../Components/OwnerComponent/OwnerPanditBooking"

const Owner = () => {
  return (
    <>
      <LayoutEl>
        <Routes>
          <Route path="/" element={<OwnerDashBoardEl />} />
          <Route path="/pandits" element={<OwnerPanditAll />} />
          <Route path="/sellers" element={<OwnerSellerAll />} />
          <Route path="/roleChangeRequest" element= {<RoleChngRequest />} />
          <Route path="/panditBooking" element={<PanditBooking />} />
          <Route path="/manageProducts" element={<ManageProductsEl />} />
          <Route path="/addProduct" element={<AddProductHero />} />
          <Route path="/pandits/:id" element={<SpecificPanditEl />} />
          <Route path="/sellers/:id" element={<SpecificSellerEl />} />
        </Routes>
      </LayoutEl>
    </>
  )
}
export default Owner
