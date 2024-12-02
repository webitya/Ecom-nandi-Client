import { Route, Routes } from "react-router-dom"
import LayoutEl from "../../Shared/LayoutEl"
import OwnerDashBoardEl from "../../Components/OwnerComponent/OwnerDashboardEl"
// import OwnerPanditChain from "../../Components/OwnerComponent/PanditChain"
// import OwnerSellerChain from "../../Components/OwnerComponent/SellerChain"
import OwnerPanditAll from "../../Components/OwnerComponent/OwnerPanditAll"
import OwnerSellerAll from "../../Components/OwnerComponent/OwnerSellerAll"
import SpecificPanditEl from "../../Components/OwnerComponent/SpecificPanditEl"
import SpecificSellerEl from "../../Components/OwnerComponent/SpecificSellerEl"
import RoleChngRequest from "../../Components/OwnerComponent/RoleChngRequest"

const Owner = () => {
  return (
    <>
      <LayoutEl>
        <Routes>
          <Route path="/" element={<OwnerDashBoardEl />} />
          {/* <Route path="/panditRequest" element={<OwnerPanditChain />} />
          <Route path="/sellerRequest" element={<OwnerSellerChain />} /> */}
          <Route path="/pandits" element={<OwnerPanditAll />} />
          <Route path="/sellers" element={<OwnerSellerAll />} />
          <Route path="/roleChangeRequest" element= {<RoleChngRequest />} />
          <Route path="/pandits/:id" element={<SpecificPanditEl />} />
          <Route path="/sellers/:id" element={<SpecificSellerEl />} />
        </Routes>
      </LayoutEl>
    </>
  )
}
export default Owner
