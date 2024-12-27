import React from "react";
import {
  UserOutlined,
  TeamOutlined,
  ShopOutlined,
  FileAddOutlined,
  // CreditCardFilled,
  ProductFilled,
  // PlusCircleFilled,
  BookFilled,
  // ShoppingFilled,
  // EyeFilled,
  // SettingFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const OwnerDashBoardEl = () => {

  const dashboardValue = useSelector(state => state.dashboard_value.value);
  console.log(dashboardValue);

  const stats = [
    {
      title: "Total Users",
      value: dashboardValue.totalUser || 0,
      icon: <UserOutlined />,
      gradient: "from-blue-500 to-blue-300",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Pandits",
      value: dashboardValue.totalpandit || 0,
      icon: <TeamOutlined />,
      gradient: "from-yellow-500 to-yellow-300",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Total Sellers",
      value: dashboardValue.totalseller || 0,
      icon: <ShopOutlined />,
      gradient: "from-red-500 to-red-300",
      bgColor: "bg-red-50",
    },
    {
      title: "Pending Requests for Role Change",
      value: dashboardValue.totalPendingRequest || 0,
      icon: <FileAddOutlined />,
      gradient: "from-purple-500 to-purple-300",
      bgColor: "bg-purple-50",
    },
    {
      title: "Pandit Booking",
      value: dashboardValue.totalPanditBooking || 0,
      icon: <BookFilled />,
      gradient: "from-green-500 to-green-300",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Products",
      value: dashboardValue.totalProducts || 0,
      icon: <ProductFilled />,
      gradient: "from-teal-500 to-teal-300",
      bgColor: "bg-teal-50",
    },
  ];

  const walletArray= [
    {
      title: "In-House Earning",
      value: "₹0.00",
      icon: "📈",
    },
    {
      title: "Commission Earned",
      value: "₹0.00",
      icon: "💹",
    },
    {
      title: "Delivery Charge Earned",
      value: "₹0.00",
      icon: "🚚",
    },
    {
      title: "Total Tax Collected",
      value: "₹0.00",
      icon: "💸",
    },
    {
      title: "Pending Amount",
      value: "₹0.00",
      icon: "💵",
    },
  ]

  return (

    <div className="bg-[#f9f9f9] container flex flex-[5]">
      {/* Sidebar */}

      <div className="p-6 w-full flex flex-col gap-4">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <span className="mr-2 text-2xl">📊</span> Business Analytics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-6 shadow-lg rounded-xl flex items-center transition-transform transform hover:scale-105 hover:shadow-2xl ${stat.bgColor}`}
              >
                {/* Icon Section */}
                <div
                  className={`text-2xl p-4 rounded-full bg-gradient-to-br ${stat.gradient} text-white flex justify-center items-center`}
                >
                  {stat.icon}
                </div>
                {/* Text Content */}
                <div className="ml-6">
                  <p className="text-md font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-lg">💰</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Admin Wallet</h2>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {walletArray.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 border rounded-md shadow-sm bg-white hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>

  );
};

export default OwnerDashBoardEl;
