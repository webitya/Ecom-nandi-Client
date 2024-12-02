import React from "react";
import {
  UserOutlined,
  TeamOutlined,
  SolutionOutlined,
  ShopOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const OwnerDashBoardEl = () => {
  const stats = [
    {
      title: "Total Number of Users",
      value: 1200,
      icon: <UserOutlined />,
      gradient: "from-blue-500 to-blue-300",
      bgColor: "bg-blue-50",
      path:""
    },
    {
      title: "Total Number of Pandits",
      value: 300,
      icon: <TeamOutlined />,
      gradient: "from-yellow-500 to-yellow-300",
      bgColor: "bg-yellow-50",
      path:"pandits"
    },
    {
      title: "Total Number of Sellers",
      value: 500,
      icon: <ShopOutlined />,
      gradient: "from-red-500 to-red-300",
      bgColor: "bg-red-50",
      path:"sellers"
    },
    {
      title: "Total Number of Role Change Requests",
      value: 220,
      icon: <FileAddOutlined />,
      gradient: "from-purple-500 to-purple-300",
      bgColor: "bg-purple-50",
      path:"roleChangeRequest"
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Link key={index} to={stat.path}>
           <div
            
            className={`p-6 shadow-md rounded-lg flex items-center transition-transform transform hover:scale-105 hover:shadow-lg ${stat.bgColor}`}
          >
            <div
              className={`text-4xl p-4 rounded-full bg-gradient-to-r ${stat.gradient} text-white`}
            >
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
             
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OwnerDashBoardEl;
