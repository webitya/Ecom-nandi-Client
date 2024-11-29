import {
    EyeFilled,
    ShoppingFilled,
    ProductFilled,
} from "@ant-design/icons";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import SidebarEl from "../../SidebarEl";
import PanditPage1 from "../PanditPage1";
import PanditPage2 from "../PanditPage2";
import PanditPage3 from "../PanditPage3";

const   PanditSidebars = () => {
    const location= useLocation();
    console.log();
    
    const [activeTab, setActiveTab] = useState(location.pathname.split('/')[2]);
    const Panditmenu = [
        {
            value: 'Pandit tab 1',
            Icon: EyeFilled,
            key: 'Pandit1',
        },
        {
            value: 'Pandit tab 2',
            Icon: ProductFilled ,
            key: 'Pandit2',
        },
        {
            value: 'Pandit tab 3',
            Icon: ShoppingFilled,
            key: 'Pandit3',
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
                menuItems={Panditmenu}
                tab={activeTab}
                setTab={setActiveTab}
            />

            {/* Main Content Area */}
            <Routes>
                <Route path="/Pandit1" element={<PanditPage1 />}
                />
                <Route path="/Pandit2" element={<PanditPage2 />}/>
                <Route path="/Pandit3" element={<PanditPage3 />} />
            </Routes>
        </div>
    );
};
export default PanditSidebars
