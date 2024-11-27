import { Route, Routes } from "react-router-dom"
import { AccountLayoutEl } from "../../Components/AccountProfile/AccountLayoutEl"
import LayoutEl from "../../Shared/LayoutEl"
import AccProfileEl from "../../Components/AccountProfile/AccProfileEl"
import AccCartEl from "../../Components/AccountProfile/AccCartEl"
import AccAddressEl from "../../Components/AccountProfile/AccAddressEl"
import AccRegisterPanditEl from "../../Components/AccountProfile/AccRegisterPanditEl"
import AccRegisterSellerEl from "../../Components/AccountProfile/AccRegisterSellerEl"


const Accounts = () => {
    const display = (
        <>
            <LayoutEl>
                <AccountLayoutEl>
                    {
                        <Routes>
                            <Route path="/" element={<AccProfileEl />} />
                            <Route path="/cart" element={<AccCartEl />} />
                            <Route path="/address" element={<AccAddressEl />} />
                            <Route path="/address" element={<AccAddressEl />} />
                            <Route path="/panditRegistrations" element={<AccRegisterPanditEl />} />
                            <Route path="/sellerRegistrations" element={<AccRegisterSellerEl />} />
                        </Routes>
                    }
                </AccountLayoutEl>
            </LayoutEl>
        </>
    )
    return display
}
export default Accounts