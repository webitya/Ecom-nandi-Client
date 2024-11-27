import React, { useState } from "react";
import { MenuOutlined, CloseOutlined, HomeOutlined, UserOutlined, SolutionOutlined, TeamOutlined, BookOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const OwnerLayoutEl = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const location = useLocation(); // For active menu highlighting

  const drawerArray = [
    {
      path: "",
      name: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      path: "sellerRequest",
      name: "Seller Request",
      icon: <SolutionOutlined />,
    },
    {
      path: "panditRequest",
      name: "Pandit Request",
      icon: <BookOutlined />,
    },
    {
      path: "sellers",
      name: "Sellers",
      icon: <TeamOutlined />,
    },
    {
      path: "pandits",
      name: "Pandits",
      icon: <UserOutlined />,
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Drawer */}
      <div
        className={`bg-white h-full shadow-lg transition-all duration-300 ${
          isDrawerOpen ? "w-[200px]" : "w-[45px]"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
          <span className={`${isDrawerOpen ? "block" : "hidden"} text-lg font-bold`}>
            Menu
          </span>
          <button
            className="text-white text-xl"
            onClick={() => setDrawerOpen(!isDrawerOpen)}
          >
            {isDrawerOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>

        {/* Drawer Items */}
        <ul className="mt-4 space-y-2">
          {drawerArray.map((item, index) => (
            <Link key={index} to={item.path}>
              <li
                className={`flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-blue-100 transition-all ${
                  location.pathname === item.path ? "bg-blue-50 border-l-4 border-blue-600 font-semibold" : ""
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className={`${isDrawerOpen ? "block" : "hidden"}`}>{item.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-6">
        {children}
      </div>
    </div>
  );
};

export default OwnerLayoutEl;
