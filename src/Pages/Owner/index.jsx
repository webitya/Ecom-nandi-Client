import { BrowserRouter, Route, Routes } from "react-router-dom"
import OwnerLayoutEl from "../../Components/OwnerComponent/OwnerLayoutEl"
import LayoutEl from "../../Shared/LayoutEl"
import OwnerDashBoardEl from "../../Components/OwnerComponent/OwnerDashboardEl"
import OwnerPanditChain from "../../Components/OwnerComponent/PanditChain"
import OwnerSellerChain from "../../Components/OwnerComponent/SellerChain"
import OwnerPanditAll from "../../Components/OwnerComponent/OwnerPanditAll"
import OwnerSellerAll from "../../Components/OwnerComponent/OwnerSellerAll"



const Owner=()=>{
    return(
        <>
          <LayoutEl>

            <div className="relative">
            <OwnerLayoutEl>
              
              <Routes>
                  <Route path="/" element={<OwnerDashBoardEl/>} />
                  <Route path="/panditRequest" element={<OwnerPanditChain/>} />
                  <Route path="/sellerRequest" element={<OwnerSellerChain/>} />
                  <Route path="/pandits" element={<OwnerPanditAll/>} />
                  <Route path="/sellers" element={<OwnerSellerAll/>} />
                  <Route path="/pandits/:id" element={<div>aditya chutiya hai <span className="text-red-500">*</span></div>}/>
              </Routes>
            
          </OwnerLayoutEl>
            </div>
          </LayoutEl>
        </>
    )
}
export default Owner