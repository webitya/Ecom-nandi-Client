import React, { useState } from "react";
import {
    MenuOutlined,
    CloseOutlined,
    HomeOutlined,
    UserOutlined,
    SolutionOutlined,
    TeamOutlined,
    BookOutlined,
    ShoppingCartOutlined,
    ShopOutlined,
    BellOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

export const AccountSidebar = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(true);
    const location = useLocation();

    const drawerArray = [
        {
            path: "",
            name: "Personal Profile",
            icon: <UserOutlined />,
        },
        {
            path: "address",
            name: "Manage Address",
            icon: <SolutionOutlined />,
        },
        {
            path: "orders",
            name: "My Orders",
            icon: <ShoppingCartOutlined />,
        },
        {
            path: "cart",
            name: "Shopping Cart",
            icon: <ShoppingCartOutlined />,
        },
        {
            path: "notifications",
            name: "Notifications",
            icon: <BellOutlined />,
        },
        {
            path: "panditRegistrations",
            name: "Book you pandit",
            icon: <BookOutlined />,
        },
        {
            path: "sellerRegistrations",
            name: "Seller Registration",
            icon: <ShopOutlined />,
        },
        {
            path: "support",
            name: "Support & Help",
            icon: <QuestionCircleOutlined />,
        },
    ];


    return (
        <div
            className={`bg-white min-h-screen shadow-lg transition-all duration-300 ${isDrawerOpen ? "w-[250px]" : "w-[60px]"
                }`}
        >
            {/* Header Section */}
            <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
                {isDrawerOpen && <span className="text-lg font-bold">Menu</span>}
                <button
                    className="text-white text-xl"
                    onClick={() => setDrawerOpen(!isDrawerOpen)}
                >
                    {isDrawerOpen ? <CloseOutlined /> : <MenuOutlined />}
                </button>
            </div>

            {/* Navigation Menu */}
            <ul className="mt-4 space-y-2">
                {drawerArray.map((item, index) => (
                    <Link key={index} to={`${item.path}`}>
                        <li
                            className={`flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-blue-100 transition-all ${location.pathname === `/${item.path}`
                                ? "bg-blue-50 border-l-4 border-blue-600 font-semibold"
                                : ""
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {isDrawerOpen && <span>{item.name}</span>}
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};
