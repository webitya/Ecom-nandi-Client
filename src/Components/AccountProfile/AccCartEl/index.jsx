

import { useEffect, useState } from "react";
import { Card, Col, Row, InputNumber } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AccCartEl = () => {
  const dummyData = [
    {
      id: 1,
      name: "Wireless Headphones with Extra Long Name for Testing",
      description:
        "Noise-cancelling wireless headphones with superior sound quality, long-lasting battery, and comfortable design.",
      price: '₹7499',
      quantity: 1,
      category: "electronics",
      images: ["https://via.placeholder.com/150"],
    },
    {
      id: 2,
      name: "Smartphone Case",
      description: "Durable and stylish case for smartphones.",
      price: 599,
      quantity: 2,
      category: "accessories",
      images: ["https://via.placeholder.com/150"],
    },
  ];

  return (
    <div className="md:px-12 px-6 md:py-6 py-3">
  <h2 className="md:text-3xl text-xl font-bold mb-6 text-gray-800">Your Cart</h2>
  <div className="flex flex-col gap-4">
    {dummyData.map((items) => {
      return (
        <div
          className="md:p-6 p-3 bg-white md:shadow-lg shadow-sm rounded-lg flex flex-col lg:flex-row gap-4 sm:max-w-[840px] w-full mx-auto"
          key={items.id}
        >
          <div className="flex gap-2.5 items-center">
            <img
              src={items.images}
              alt="product image"
              className="sm:h-28 sm:w-28 h-20 w-20 object-cover rounded"
            />
            <h3 className="md:text-xl sm:text-lg text-base font-semibold lg:hidden block">{items.name}</h3>
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <h3 className="sm:text-xl text-sm font-semibold lg:block hidden">{items.name}</h3>
            <p className="sm:text-sm text-xs font-light text-[#878787] whitespace-nowrap text-ellipsis overflow-hidden w-[270px] lg:w-full">
              {items.description}
            </p>
            <span className="text-sm font-semibold text-[#878787] capitalize">{items.category}</span>

            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
              <div className="flex gap-4 items-center">
                <p className="flex gap-3 items-center">
                  <span className="text-sm text-[#878787] line-through">{items.price}</span>
                  <span className="text-lg text-black">{'₹5499'}</span>
                </p>

                <p className="flex gap-3 items-center">
                  <PlusOutlined className="border border-[#878787] rounded-full p-2" />
                  <span className="w-10 h-6 border border-black text-center">{items.quantity}</span>
                  <MinusOutlined className="border border-[#878787] rounded-full p-2" />
                </p>
              </div>

              <button 
              className=" lg:bg-white lg:p-0 lg:rounded-none lg:text-black bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium mt-2 sm:mt-0 md:w-fit w-full">
                Remove
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>

  <div className="p-6 mt-10 bg-white shadow-lg rounded-lg flex flex-col gap-4 sm:max-w-[840px] w-full mx-auto">
    <div className="flex justify-between items-center">
      <h2 className="font-semibold">Total Price:</h2>
      <span>₹8099</span>
    </div>

    <div className="flex justify-between items-center">
      <h2 className="font-semibold">Discount:</h2>
      <span>-₹3019</span>
    </div>

    <div className="flex justify-between items-center">
      <h2 className="font-semibold">Delivery Charges:</h2>
      <span>Free</span>
    </div>

    <div className="h-px w-full bg-[#87878738]"></div>

    <div className="flex justify-between items-center">
      <h2 className="font-semibold">Total Amount:</h2>
      <span>₹5080</span>
    </div>
  </div>
</div>
  );
}

export default AccCartEl;

// const AccCartEl = () => {
//   const dummyData = [
//     {
//       id: 1,
//       name: "Wireless Headphones with Extra Long Name for Testing",
//       description:
//         "Noise-cancelling wireless headphones with superior sound quality, long-lasting battery, and comfortable design.",
//       price: "₹7499",
//       quantity: 1,
//       category: "electronics",
//       images: ["https://via.placeholder.com/150"],
//     },
//     {
//       id: 2,
//       name: "Smartphone Case",
//       description: "Durable and stylish case for smartphones.",
//       price: 599,
//       quantity: 2,
//       category: "accessories",
//       images: ["https://via.placeholder.com/150"],
//     },
//   ];

//   return (
//     <div className="md:px-12 px-6 md:py-6 py-3">
//       <h2 className="md:text-3xl text-xl font-bold mb-6 text-gray-800">
//         Your Cart
//       </h2>
//       <div className="flex flex-col gap-4">
//         {dummyData.map((items) => (
//           <div
//             className="md:p-6 p-3 bg-white md:shadow-lg shadow-sm rounded-lg md:grid md:grid-cols-2 items-center gap-4 sm:max-w-[840px] w-full mx-auto"
//             key={items.id}
//           >
//             <div className="flex gap-2.5 items-center md:col-span-1">
//               <img
//                 src={items.images}
//                 alt="product image"
//                 className="sm:h-28 sm:w-28 h-20 w-20 object-cover rounded"
//               />
//               <h3 className="md:text-xl sm:text-lg text-base font-semibold md:hidden block">
//                 {items.name}
//               </h3>
//             </div>
//             <div className="flex flex-col gap-2 flex-grow md:col-span-1">
//               <h3 className="sm:text-xl text-sm font-semibold md:block hidden">
//                 {items.name}
//               </h3>
//               <p className="sm:text-sm text-xs font-light text-[#878787] text-ellipsis overflow-hidden sm:w-auto w-full">
//                 {items.description}
//               </p>
//               <span className="text-sm font-semibold text-[#878787] capitalize">
//                 {items.category}
//               </span>
//               <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
//                 <div className="flex gap-4 items-center lg:flex-row flex-col">
//                   <p className="flex gap-3 items-center">
//                     <span className="text-sm text-[#878787] line-through">
//                       {items.price}
//                     </span>
//                     <span className="text-lg text-black">₹5499</span>
//                   </p>
//                   <p className="flex gap-3 items-center">
//                     <PlusOutlined className="border border-[#878787] rounded-full p-2" />
//                     <span className="w-10 h-6 border border-black text-center">
//                       {items.quantity}
//                     </span>
//                     <MinusOutlined className="border border-[#878787] rounded-full p-2" />
//                   </p>
//                 </div>
//                 <button className="md:bg-white md:p-0 md:rounded-none bg-red-500 text-white py-1 rounded-lg hover:bg-red-600 transition-colors font-medium mt-2 sm:mt-0 md:w-fit w-full">
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="p-6 mt-10 bg-white shadow-lg rounded-lg flex flex-col gap-4 sm:max-w-[840px] w-full mx-auto">
//         <div className="flex justify-between items-center">
//           <h2 className="font-semibold">Total Price:</h2>
//           <span>₹8099</span>
//         </div>
//         <div className="flex justify-between items-center">
//           <h2 className="font-semibold">Discount:</h2>
//           <span>-₹3019</span>
//         </div>
//         <div className="flex justify-between items-center">
//           <h2 className="font-semibold">Delivery Charges:</h2>
//           <span>Free</span>
//         </div>
//         <div className="h-px w-full bg-[#87878738]"></div>
//         <div className="flex justify-between items-center">
//           <h2 className="font-semibold">Total Amount:</h2>
//           <span>₹5080</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccCartEl;
