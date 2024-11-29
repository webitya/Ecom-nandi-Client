import React, { useState } from "react";
import { MenuOutlined, CloseOutlined, HomeOutlined, UserOutlined, SolutionOutlined, TeamOutlined, BookOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import SidebarEl from "../../SidebarEl";
const OwnerLayoutEl = ({ children }) => {
  
  const location = useLocation(); // For active menu highlighting
  const [activeTab, setActiveTab] = useState(location.pathname.split('/')[2]);
  const drawerArray = [
    // {
    //   path: "",
    //   value: 'Dashboard',
    //   icon: <HomeOutlined />,
    // },
    // {
    //   path: "sellerRequest",
    //   name: "Seller Request",
    //   icon: <SolutionOutlined />,
    // },
    // {
    //   path: "panditRequest",
    //   name: "Pandit Request",
    //   icon: <BookOutlined />,
    // },
    // {
    //   path: "sellers",
    //   name: "Sellers",
    //   icon: <TeamOutlined />,
    // },
    // {
    //   path: "pandits",
    //   name: "Pandits",
    //   icon: <UserOutlined />,
    // },
    {
      value: 'Dashboard',
      Icon: HomeOutlined,
      key:  "",
  },
  {
      value: 'Seller Request',
      Icon: SolutionOutlined ,
      key: 'sellerRequest',
  },
  {
      value: 'Pandit Request',
      Icon: BookOutlined,
      key: "panditRequest",
  },
  {
      value: 'sellers',
      Icon: TeamOutlined,
      key: "sellers",
  },
  {
    value: 'Pandits',
    Icon: TeamOutlined,
    key: "pandits",
}
  ];

  return (
    <div className="flex h-screen">
      {/* Drawer */}
     
            {/* Sidebar */}
            <SidebarEl
                name={"Mobile B.V."}
                symbol={"m"}
                id={8342567}
                balance={"$4200.30"}
                menuItems={drawerArray}
                tab={activeTab}
                setTab={setActiveTab}
            />
      

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6">
        {children}
      </div>
    </div>
  );
};

export default OwnerLayoutEl;
