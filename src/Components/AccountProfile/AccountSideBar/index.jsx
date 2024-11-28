import React, { useState } from "react";
import {
    MenuOutlined,
    UserOutlined,
    SolutionOutlined,
    ShoppingCartOutlined,
    BellOutlined,
    BookOutlined,
    ShopOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { Button, Drawer } from "antd";

export const AccountSidebar = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();

    const drawerArray = [
        { path: "", name: "Personal Profile", icon: <UserOutlined /> },
        { path: "address", name: "Manage Address", icon: <SolutionOutlined /> },
        { path: "orders", name: "My Orders", icon: <ShoppingCartOutlined /> },
        { path: "cart", name: "Shopping Cart", icon: <ShoppingCartOutlined /> },
        { path: "notifications", name: "Notifications", icon: <BellOutlined /> },
        { path: "panditRegistrations", name: "Book Your Pandit", icon: <BookOutlined /> },
        { path: "sellerRegistrations", name: "Seller Registration", icon: <ShopOutlined /> },
        { path: "support", name: "Support & Help", icon: <QuestionCircleOutlined /> },
    ];

    return (
        <>

            <div className="sm:hidden ml-[10px] mt-2 mb-2 ">
                <Button onClick={() => setDrawerOpen(true)} color="primary" variant="solid">
                    Menu
                </Button>
            </div>

            {/* Ant Design Drawer */}
            <Drawer
                title="Menu"
                placement="left"
                closable={true}
                onClose={() => setDrawerOpen(false)}
                open={isDrawerOpen}
                className="p-0"
                width={250}
                bodyStyle={{ padding: "0" }}
            >
                <ul className="mt-4 space-y-2">
                    {drawerArray.map((item, index) => (
                        <Link key={index} to={`/${item.path}`} onClick={() => setDrawerOpen(false)}>
                            <li
                                className={`flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-blue-100 transition-all ${location.pathname === `/${item.path}`
                                    ? "bg-blue-50 border-l-4 border-blue-600 font-semibold"
                                    : ""
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span>{item.name}</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </Drawer>

            <div className="hidden md:block bg-gray-50 min-h-screen w-[250px] shadow-md border-r border-gray-200">
                {/* Sidebar Header */}
                <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                    <h2 className="text-xl font-bold tracking-wide">Menu</h2>
                </div>

                {/* Navigation Menu */}
                <ul className="mt-6">
                    {drawerArray.map((item, index) => (
                        <Link key={index} to={`${item.path}`}>
                            <li
                                className={`flex items-center gap-4 px-4 py-3 mx-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-100 transition-all ${location.pathname === `${item.path}`
                                        ? "bg-blue-50 border-l-4 border-blue-600 text-blue-700 font-semibold"
                                        : ""
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                <span className="truncate">{item.name}</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>

        </>
    );
};
