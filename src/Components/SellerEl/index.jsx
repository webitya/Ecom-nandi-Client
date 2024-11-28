import {
    EyeFilled,
    PieChartFilled,
    ShoppingFilled,
    SettingFilled,
    ProductFilled,
} from "@ant-design/icons";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import SidebarEl from "../SidebarEl";
import SellerOvEl from "./SellerOverViewEl";
import AddProductHero from "../AddProductComp/addProductHeroEl";
import SellerOrderEl from "./SellerOrderEl";

const SellerEl = () => {
    const location= useLocation();
    console.log();
    
    const [activeTab, setActiveTab] = useState(location.pathname.split('/')[2]);
    const menuItems = [
        {
            value: 'Overview',
            Icon: EyeFilled,
            key: 'overview',
        },
        {
            value: 'Add Products',
            Icon: ProductFilled ,
            key: 'add-products',
        },
        {
            value: 'Orders',
            Icon: ShoppingFilled,
            key: 'orders',
        },
        {
            value: 'Settings',
            Icon: SettingFilled,
            key: 'settings',
        }
    ]

    return (
        <div className="flex">

            {/* Sidebar */}
            <SidebarEl
                name={"Mobile B.V."}
                symbol={"m"}
                id={8342567}
                balance={"$4200.30"}
                menuItems={menuItems}
                tab={activeTab}
                setTab={setActiveTab}
            />

            {/* Main Content Area */}
            <Routes>
                <Route path="/overview" element={<SellerOvEl />}
                />
                <Route path="/add-products" element={<AddProductHero />}/>
                <Route path="/orders" element={<SellerOrderEl />} />
                <Route path="/setting" element={
                    (<div className="flex-1 bg-white p-6">
                        <h1 className="text-2xl font-bold text-[#2d2f36]">Setting</h1>
                    </div>)}
                />
            </Routes>
        </div>
    );
};

export default SellerEl;