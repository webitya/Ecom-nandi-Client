import React, { useEffect } from "react";
import {
  UserOutlined,
  TeamOutlined,
  ShopOutlined,
  FileAddOutlined,
  CreditCardFilled,
  ProductFilled,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useRequestApi } from "../../../hooks/useRequestApi";
import toast from "react-hot-toast";

const OwnerDashBoardEl = () => {
  const navigate = useNavigate();
  const stats = [
    {
      title: "Total Number of Users",
      value: 1200,
      icon: <UserOutlined />,
      gradient: "from-blue-500 to-blue-300",
      bgColor: "bg-blue-50",
      path: ""
    },
    {
      title: "Total Number of Pandits",
      value: 300,
      icon: <TeamOutlined />,
      gradient: "from-yellow-500 to-yellow-300",
      bgColor: "bg-yellow-50",
      path: "pandits"
    },
    {
      title: "Total Number of Sellers",
      value: 500,
      icon: <ShopOutlined />,
      gradient: "from-red-500 to-red-300",
      bgColor: "bg-red-50",
      path: "sellers"
    },
    {
      title: "Pending Role Change Requests",
      value: 220,
      icon: <FileAddOutlined />,
      gradient: "from-purple-500 to-purple-300",
      bgColor: "bg-purple-50",
      path: "roleChangeRequest"
    },
    {
      title: "Pending Payments",
      value: 12,
      icon: <CreditCardFilled />,
      gradient: "from-green-500 to-green-300",
      bgColor: "bg-green-50",
      path: "pendingPayment"
    },
    {
      title: "Manage Products",
      value: 34,
      icon: <ProductFilled />,
      gradient: "from-teal-500 to-teal-300",
      bgColor: "bg-teal-50",
      path: "manageProducts"
    },
    {
      title: "Add Product",
      value: null,
      icon: <PlusCircleFilled />,
      gradient: "from-orange-500 to-orange-300",
      bgColor: "bg-orange-50",
      path: "addProduct"
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await useRequestApi('api/role/getPendingSellerRequest')
        if (response.data) {
          console.log("pending requests",response.data)
        }
      }
      catch (error) {
        toast.error(error?.response?.data?.message || "Some Server Error")
      }
    }

    const getAnotherData= async () => {
      try{
        const response= await useRequestApi('api/owner/getAllSeller')
        if (response.data) {
          console.log("all sellers",response.data)
        }
      }catch(error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Some Server Error")
      }
    }

    // const getYetAnotherData= async() => {
    //   try{
    //     const response= await useRequestApi("")
        
    //   }
    // }
    getAnotherData();
    getData();
  }, [])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        {/* <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-md shadow hover:bg-gray-200 transition-colors duration-200"
          >
            ← Back
          </button> */}
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
