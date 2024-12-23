// import { ShoppingCartOutlined, MoneyCollectOutlined } from "@ant-design/icons";
// import { useState } from "react";

// const OwnerOrdersEl = () => {

//     const orderDetail = [
// {
//    productId: "645248905hghfh",
//    productName: "puja incense",
//    quantity: "2",
//    totalAmount: "₹845",
//    discountAmount: "₹665",
//    orderDate: "12-11-2024",
//    paymentMethod: 'cod',
//    deliveryStatus: "pending"
// },
//         {

//         },
//         {

//         },
//     ];

    // const  [searchQuery, setSearchQuery] = useState('');

    //     const handleSearchQuery = (e) => {
    //         const { value } = e.target
    //         setSearchQuery(value);
    //     }

    //     const filteredOrdered= orderDetail.filter(
    //         (order) => order.Sl.includes(searchQuery)
    //             || order.Product_name.toLowerCase().includes(searchQuery.toLowerCase())
    //             || order.category.toLowerCase().includes(searchQuery.toLowerCase())
    //             || order.price.includes(searchQuery)
    //     )

    //     const restOfOrders = orderDetail.filter(
    //         (order) => {
    //             return !(filteredOrdered.some(filtered => filtered.Product_id === orderDetail.Product_id))
    //         }
    //     );

    //     const orderForMaping = [
    //         ...filteredOrdered, ...restOfOrders
    //     ]

//     return (
//         <div className="flex flex-col items-center p-6">
//             <h1 className="text-3xl font-bold mb-6 text-gray-800">Orders Statistics</h1>

//             <div className="flex flex-wrap justify-center gap-8">
//                 {/* Total Orders Card */}
//                 <div className="flex flex-col items-center w-72 p-6 bg-white shadow-md rounded-lg">
//                     <ShoppingCartOutlined className="text-yellow-400 text-5xl mb-2" />
//                     <div className="text-4xl font-bold mb-2 text-gray-800">15</div>
//                     <p className="text-gray-500 text-sm mb-4">Total Orders</p>
//                     <div className="flex justify-around w-full text-sm">
//                         <div className="text-red-500 font-medium text-center">
//                             <p className="text-lg font-bold">5</p>
//                             <p>Canceled</p>
//                         </div>
//                         <div className="text-blue-500 font-medium text-center">
//                             <p className="text-lg font-bold">0</p>
//                             <p>Ongoing</p>
//                         </div>
//                         <div className="text-green-500 font-medium text-center">
//                             <p className="text-lg font-bold">10</p>
//                             <p>Completed</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Total Order Amount Card */}
//                 <div className="flex flex-col items-center w-72 p-6 bg-white shadow-md rounded-lg">
//                     <MoneyCollectOutlined className="text-yellow-500 text-5xl mb-2" />
//                     <div className="text-3xl font-bold mb-2 text-gray-800">₹7,943.00</div>
//                     <p className="text-gray-500 text-sm mb-4">Total Order Amount</p>
//                     <div className="flex justify-around w-full text-sm">
//                         <div className="text-red-500 font-medium text-center">
//                             <p className="text-lg font-bold">₹0.00</p>
//                             <p>Due Amount</p>
//                         </div>
//                         <div className="text-green-500 font-medium text-center">
//                             <p className="text-lg font-bold">₹7,943.00</p>
//                             <p>Already Settled</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div>

//             </div>
//         </div>
//     )
// }

// export default OwnerOrdersEl;

import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

const OwnerOrdersEl = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const productData = [
    {
      productId: "645248905hghfh",
      productName: "Puja Incense",
      quantity: "2",
      totalAmount: "₹845",
      discountAmount: "₹665",
      orderDate: "12-11-2024",
      paymentMethod: "COD",
      deliveryStatus: "Pending",
    },
    {
      productId: "8452187ghytr",
      productName: "Hawan Samagri",
      quantity: "1",
      totalAmount: "₹999",
      discountAmount: "₹799",
      orderDate: "15-11-2024",
      paymentMethod: "Online",
      deliveryStatus: "Delivered",
    },
    {
      productId: "74524816kkuyt",
      productName: "Photo Frame",
      quantity: "3",
      totalAmount: "₹1299",
      discountAmount: "₹999",
      orderDate: "17-11-2024",
      paymentMethod: "COD",
      deliveryStatus: "Cancelled",
    },
  ];

  // Search Logic: Filtered & Remaining Products
  const filteredProducts = productData.filter(
    (product) =>
      product.productId.includes(searchQuery) ||
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.deliveryStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.orderDate.includes(searchQuery)
  );

  const remainingProducts = productData.filter(
    (product) =>
      !filteredProducts.some(
        (filtered) => filtered.productId === product.productId
      )
  );

  const orderedProducts = [...filteredProducts, ...remainingProducts];

  // Status Badge Styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-600 border border-yellow-300";
      case "Delivered":
        return "bg-green-100 text-green-600 border border-green-300";
      case "Cancelled":
        return "bg-red-100 text-red-600 border border-red-300";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-[#f2f2f2] container mx-auto">
      {/* Title */}
      <h1 className="text-3xl text-center font-bold text-[#2d2f36] mb-6">
        Product Orders
      </h1>

      {/* Search Input */}
      <div className="relative mb-6 w-[90%] mx-auto">
        <input
          type="text"
          placeholder="Search by Product ID, Name, or Delivery Status"
          value={searchQuery}
          onChange={handleSearchQuery}
          className="border-none outline-none pl-10 pr-6 py-2 rounded-lg w-full shadow-md text-gray-700 focus:ring-2 focus:ring-blue-400 transition"
        />
        <SearchOutlined className="absolute top-1/2 -translate-y-1/2 left-[3%] text-lg text-gray-500" />
      </div>

      {/* Scrollable Table */}
      <div className="w-full bg-white shadow-lg rounded-lg overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Table Header */}
          <div className="flex text-gray-800 text-sm font-semibold border-b bg-blue-50 sticky top-0 z-10">
            <div className="flex-1 px-4 py-3">SL</div>
            <div className="flex-[2] px-4 py-3">Product ID</div>
            <div className="flex-[2] px-4 py-3">Product Name</div>
            <div className="flex-1 px-4 py-3">Quantity</div>
            <div className="flex-1 px-4 py-3">Total Amount</div>
            <div className="flex-1 px-4 py-3">Discount</div>
            <div className="flex-[2] px-4 py-3">Order Date</div>
            <div className="flex-1 px-4 py-3">Payment Method</div>
            <div className="flex-[2] px-4 py-3">Delivery Status</div>
          </div>

          {/* Data Rows */}
          <div>
            {orderedProducts.map((product, index) => (
              <div
                key={product.productId}
                className={`flex text-sm transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <div className="flex-1 px-4 py-3 text-gray-600">
                  {index + 1}
                </div>
                <div className="flex-[2] px-4 py-3 text-gray-800">
                  {product.productId}
                </div>
                <div className="flex-[2] px-4 py-3 text-gray-800 font-medium">
                  {product.productName}
                </div>
                <div className="flex-1 px-4 py-3 text-gray-500">
                  {product.quantity}
                </div>
                <div className="flex-1 px-4 py-3 text-gray-500">
                  {product.totalAmount}
                </div>
                <div className="flex-1 px-4 py-3 text-gray-500">
                  {product.discountAmount}
                </div>
                <div className="flex-[2] px-4 py-3 text-gray-500">
                  {product.orderDate}
                </div>
                <div className="flex-1 px-4 py-3 text-gray-500">
                  {product.paymentMethod}
                </div>
                <div className="flex-[2] px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      product.deliveryStatus
                    )}`}
                  >
                    {product.deliveryStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center mt-4">
        <button className="px-4 py-2 rounded-md hover:bg-blue-500 bg-blue-400 text-white font-semibold transition">
          Load More
        </button>
      </div>
    </div>
  );
};

export default OwnerOrdersEl;
