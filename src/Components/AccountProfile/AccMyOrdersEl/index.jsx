// import React from "react";
// import { Card, Avatar, Badge, Button } from "antd";

// const AccMyOrdersEl = () => {
//     const orders = [
//         {
//             selectedAddress: {
//                 fullName: "Utkarsh",
//                 address: "wasdfads",
//                 city: "wsdafas",
//                 state: "sdfasdfd",
//                 zipCode: "67667435",
//                 contactNo: "5543564634654364",
//             },
//             _id: "6766841e1782c388f919f224",
//             userId: "674f4a823bd77fe4d88b7e6a",
//             products: [
//                 {
//                     productId: "676673747eb8abe7984e9c08",
//                     quantity: 2,
//                     discountPrice: 264,
//                     name: "Birthday Gifts",
//                     totalPrice: 528,
//                     category: "Gift",
//                     image: "https://res.cloudinary.com/dowylsrxx/image/upload/v1734764903/fleli4ntrbmm4eptahnj.jpg",
//                     _id: "6766841e1782c388f919f225",
//                 },
//             ],
//             totalAmount: 528,
//             paymentMethod: "cod",
//             paymentId: null,
//             status: "pending",
//             orderDate: "2024-12-21T09:02:22.043Z",
//             createdAt: "2024-12-21T09:02:22.044Z",
//             updatedAt: "2024-12-21T09:02:22.044Z",
//             __v: 0,
//         },
//         {
//             selectedAddress: {
//                 fullName: "Utkarsh",
//                 address: "wasdfads",
//                 city: "wsdafas",
//                 state: "sdfasdfd",
//                 zipCode: "67667435",
//                 contactNo: "5543564634654364",
//             },
//             _id: "6766841e1782c388f919f224",
//             userId: "674f4a823bd77fe4d88b7e6a",
//             products: [
//                 {
//                     productId: "676673747eb8abe7984e9c08",
//                     quantity: 2,
//                     discountPrice: 264,
//                     name: "Birthday Gifts",
//                     totalPrice: 528,
//                     category: "Gift",
//                     image: "https://res.cloudinary.com/dowylsrxx/image/upload/v1734764903/fleli4ntrbmm4eptahnj.jpg",
//                     _id: "6766841e1782c388f919f225",
//                 },
//             ],
//             totalAmount: 528,
//             paymentMethod: "cod",
//             paymentId: null,
//             status: "cancelled",
//             orderDate: "2024-12-21T09:02:22.043Z",
//             createdAt: "2024-12-21T09:02:22.044Z",
//             updatedAt: "2024-12-21T09:02:22.044Z",
//             __v: 0,
//         },
//         {
//             selectedAddress: {
//                 fullName: "Utkarsh",
//                 address: "wasdfads",
//                 city: "wsdafas",
//                 state: "sdfasdfd",
//                 zipCode: "67667435",
//                 contactNo: "5543564634654364",
//             },
//             _id: "6766841e1782c388f919f224",
//             userId: "674f4a823bd77fe4d88b7e6a",
//             products: [
//                 {
//                     productId: "676673747eb8abe7984e9c08",
//                     quantity: 2,
//                     discountPrice: 264,
//                     name: "Birthday Gifts",
//                     totalPrice: 528,
//                     category: "Gift",
//                     image: "https://res.cloudinary.com/dowylsrxx/image/upload/v1734764903/fleli4ntrbmm4eptahnj.jpg",
//                     _id: "6766841e1782c388f919f225",
//                 },
//             ],
//             totalAmount: 528,
//             paymentMethod: "cod",
//             paymentId: null,
//             status: "delivered",
//             orderDate: "2024-12-21T09:02:22.043Z",
//             createdAt: "2024-12-21T09:02:22.044Z",
//             updatedAt: "2024-12-21T09:02:22.044Z",
//             __v: 0,
//         },
//         {
//             selectedAddress: {
//                 fullName: "Utkarsh",
//                 address: "wasdfads",
//                 city: "wsdafas",
//                 state: "sdfasdfd",
//                 zipCode: "67667435",
//                 contactNo: "5543564634654364",
//             },
//             _id: "6766841e1782c388f919f224",
//             userId: "674f4a823bd77fe4d88b7e6a",
//             products: [
//                 {
//                     productId: "676673747eb8abe7984e9c08",
//                     quantity: 2,
//                     discountPrice: 264,
//                     name: "Birthday Gifts That can be Used",
//                     totalPrice: 528,
//                     category: "Gift",
//                     image: "https://res.cloudinary.com/dowylsrxx/image/upload/v1734764903/fleli4ntrbmm4eptahnj.jpg",
//                     _id: "6766841e1782c388f919f225",
//                 },
//             ],
//             totalAmount: 528,
//             paymentMethod: "cod",
//             paymentId: null,
//             status: "pending",
//             orderDate: "2024-12-21T09:02:22.043Z",
//             createdAt: "2024-12-21T09:02:22.044Z",
//             updatedAt: "2024-12-21T09:02:22.044Z",
//             __v: 0,
//         },
//         // Repeat additional orders for the sake of demonstration...
//     ];

//     return (
//         <div className="max-w-6xl mx-auto p-4">
//             <h2 className="text-3xl font-semibold text-center mb-8 text-gray-700 border-b pb-4">
//                 My Orders
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {orders.map((order) => (
//                     <Card
//                         key={order._id}
//                         className="shadow-md hover:shadow-lg transition-shadow"
//                         body={{ padding: "16px" }}
//                     >
//                         <div className="flex flex-col sm:flex-row items-start sm:items-center">
//                             <Avatar
//                                 shape="square"
//                                 size={64}
//                                 src={order.products[0].image}
//                                 className="mr-4"
//                             />
//                             <div className="flex-1">
//                                 <h4 className="text-lg font-medium text-gray-800 truncate">
//                                     {order.products[0].name}
//                                 </h4>
//                                 <p className="text-sm text-gray-600">
//                                     Quantity: {order.products[0].quantity}
//                                 </p>
//                                 <p className="text-sm text-gray-600">
//                                     Price: ₹{order.products[0].totalPrice}
//                                 </p>
//                             </div>
//                             <div className="text-right">
//                                 <Badge
//                                     status={
//                                         order.status === "pending"
//                                             ? "processing"
//                                             : order.status === "delivered"
//                                                 ? "success"
//                                                 : "error"
//                                     }
//                                     text={
//                                         order.status.charAt(0).toUpperCase() + order.status.slice(1)
//                                     }
//                                 />
//                                 <p className="text-sm text-gray-500">
//                                     Order Date: {new Date(order.orderDate).toLocaleDateString()}
//                                 </p>
//                             </div>
//                         </div>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AccMyOrdersEl;


import React, { useEffect, useState } from "react";
import { Card, Avatar, Badge, Tooltip, Spin } from "antd";
import { useRequestApi } from "../../../hooks/useRequestApi";
import { div } from "framer-motion/client";
import { Link } from "react-router-dom";
import useSelection from "antd/es/table/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";
import { useSetOrder } from "../../../redux/features/orderDataSlice/orderDataSlices";

const AccMyOrdersEl = () => {
    // const orders = [
    //     {
    //         selectedAddress: {
    //             fullName: "Utkarsh",
    //             address: "wasdfads",
    //             city: "wsdafas",
    //             state: "sdfasdfd",
    //             zipCode: "67667435",
    //             contactNo: "5543564634654364",
    //         },
    //         _id: "6766841e1782c388f919f224",
    //         userId: "674f4a823bd77fe4d88b7e6a",
    //         products: [
    //             {
    //                 productId: "676673747eb8abe7984e9c08",
    //                 quantity: 2,
    //                 discountPrice: 264,
    //                 name: "Birthday Gifts",
    //                 totalPrice: 528,
    //                 category: "Gift",
    //                 image: "https://res.cloudinary.com/dowylsrxx/image/upload/v1734764903/fleli4ntrbmm4eptahnj.jpg",
    //                 _id: "6766841e1782c388f919f225",
    //             },
    //             {
    //                 productId: "676673747eb8abe7984e9c08",
    //                 quantity: 2,
    //                 discountPrice: 264,
    //                 name: "Birthday Gifts",
    //                 totalPrice: 528,
    //                 category: "Gift",
    //                 image: "https://res.cloudinary.com/dowylsrxx/image/upload/v1734764903/fleli4ntrbmm4eptahnj.jpg",
    //                 _id: "6766841e1782c388f919f225",
    //             },
    //             {
    //                 productId: "676673747eb8abe7984e9c08",
    //                 quantity: 2,
    //                 discountPrice: 264,
    //                 name: "Birthday Gifts",
    //                 totalPrice: 528,
    //                 category: "Gift",
    //                 image: "https://res.cloudinary.com/dowylsrxx/image/upload/v1734764903/fleli4ntrbmm4eptahnj.jpg",
    //                 _id: "6766841e1782c388f919f225",
    //             },
    //         ],
    //         totalAmount: 528,
    //         paymentMethod: "cod",
    //         paymentId: null,
    //         status: "pending",
    //         orderDate: "2024-12-21T09:02:22.043Z",
    //         createdAt: "2024-12-21T09:02:22.044Z",
    //         updatedAt: "2024-12-21T09:02:22.044Z",
    //         __v: 0,
    //     },
    //     {
    //         selectedAddress: {
    //             fullName: "Utkarsh",
    //             address: "wasdfads",
    //             city: "wsdafas",
    //             state: "sdfasdfd",
    //             zipCode: "67667435",
    //             contactNo: "5543564634654364",
    //         },
    //         _id: "6766841e1782c388f919f224",
    //         userId: "674f4a823bd77fe4d88b7e6a",
    //         products: [
    //             {
    //                 productId: "676673747eb8abe7984e9c08",
    //                 quantity: 2,
    //                 discountPrice: 264,
    //                 name: "Birthday Gifts",
    //                 totalPrice: 528,
    //                 category: "Gift",
    //                 image: "https://res.cloudinary.com/dowylsrxx/image/upload/v1734764903/fleli4ntrbmm4eptahnj.jpg",
    //                 _id: "6766841e1782c388f919f225",
    //             },
    //         ],
    //         totalAmount: 528,
    //         paymentMethod: "cod",
    //         paymentId: null,
    //         status: "cancelled",
    //         orderDate: "2024-12-21T09:02:22.043Z",
    //         createdAt: "2024-12-21T09:02:22.044Z",
    //         updatedAt: "2024-12-21T09:02:22.044Z",
    //         __v: 0,
    //     },
    //     {
    //         selectedAddress: {
    //             fullName: "Utkarsh",
    //             address: "wasdfads",
    //             city: "wsdafas",
    //             state: "sdfasdfd",
    //             zipCode: "67667435",
    //             contactNo: "5543564634654364",
    //         },
    //         _id: "6766841e1782c388f919f224",
    //         userId: "674f4a823bd77fe4d88b7e6a",
    //         products: [
    //             {
    //                 productId: "676673747eb8abe7984e9c08",
    //                 quantity: 2,
    //                 discountPrice: 264,
    //                 name: "Birthday Gifts That can be Used for Multiple Occasions",
    //                 totalPrice: 528,
    //                 category: "Gift",
    //                 image: "https://res.cloudinary.com/dowylsrxx/image/upload/v1734764903/fleli4ntrbmm4eptahnj.jpg",
    //                 _id: "6766841e1782c388f919f225",
    //             },
    //         ],
    //         totalAmount: 528,
    //         paymentMethod: "cod",
    //         paymentId: null,
    //         status: "pending",
    //         orderDate: "2024-12-21T09:02:22.043Z",
    //         createdAt: "2024-12-21T09:02:22.044Z",
    //         updatedAt: "2024-12-21T09:02:22.044Z",
    //         __v: 0,
    //     },
    //     {
    //         selectedAddress: {
    //             fullName: "Utkarsh",
    //             address: "wasdfads",
    //             city: "wsdafas",
    //             state: "sdfasdfd",
    //             zipCode: "67667435",
    //             contactNo: "5543564634654364",
    //         },
    //         _id: "6766841e1782c388f919f224",
    //         userId: "674f4a823bd77fe4d88b7e6a",
    //         products: [
    //             {
    //                 productId: "676673747eb8abe7984e9c08",
    //                 quantity: 2,
    //                 discountPrice: 264,
    //                 name: "Birthday Gifts That can be Used for Multiple Occasions",
    //                 totalPrice: 528,
    //                 category: "Gift",
    //                 image: "https://res.cloudinary.com/dowylsrxx/image/upload/v1734764903/fleli4ntrbmm4eptahnj.jpg",
    //                 _id: "6766841e1782c388f919f225",
    //             },
    //         ],
    //         totalAmount: 528,
    //         paymentMethod: "cod",
    //         paymentId: null,
    //         status: "delivered",
    //         orderDate: "2024-12-21T09:02:22.043Z",
    //         createdAt: "2024-12-21T09:02:22.044Z",
    //         updatedAt: "2024-12-21T09:02:22.044Z",
    //         __v: 0,
    //     },
    //     // Add more orders as needed
    // ];


    const orders = useSelector(state => state.order.value)    
    console.log(orders.length);
    
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await useRequestApi('api/order/getOrderByUserid')
                dispatch(useSetOrder(response.data))
                console.log(response);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }

        if (!orders.length) {
            fetchData();
        }
    }, [])


    // console.log(orders[0].products)

    if (loading) {
        return (
            <div className=" w-full flex items-center justify-center mt-2 ">
                <Spin />
            </div>
        )
    }
    return (
        <div className="p-4 sm:p-2 w-full lg:w-[70%] mx-auto">
            <h2 className="text-3xl sm:text-3xl font-semibold text-center mb-2 text-gray-700 pb-4 sm:pb-2">
                My Orders
            </h2>
            {
                orders.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-3">
                        {orders.map((order) => (
                            order.products.map((item) => (
                                <div
                                    key={item._id}
                                    className="shadow-md hover:shadow-lg transition-shadow w-full p-2 mx-auto"
                                >
                                    <div className="flex items-start sm:items-center gap-2 ">
                                        <Avatar
                                            shape="square"
                                            size={48}
                                            src={item.image}
                                            className="mr-2 "
                                        />
                                        <div className="flex-1 min-w-0">
                                            <Tooltip title={item.name}>
                                                <h4 className="text-sm text-gray-800 truncate max-w-[180px] ">
                                                    {item.name}
                                                </h4>
                                            </Tooltip>
                                            <p className="text-xs text-gray-600">
                                                Quantity: {item.quantity}
                                            </p>
                                            <p className="text-xs text-gray-600">
                                                Price: ₹{item.totalPrice}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <Badge
                                                status={
                                                    order.status === "pending"
                                                        ? "processing"
                                                        : order.status === "delivered"
                                                            ? "success"
                                                            : "error"
                                                }
                                                text={
                                                    order.status.charAt(0).toUpperCase() + order.status.slice(1)
                                                }
                                                className="text-xs "
                                            />
                                            <p className="text-xs text-gray-500">
                                                Order Date: {new Date(order.orderDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))

                        ))}
                    </div>
                ) : (
                    <div className=" flex w-full items-center flex-col gap-2 justify-center text-sm opacity-[.75] ">
                        <p> No any order found </p>
                        <Link className=" text-blue-600" to={'/shop'} >Go for shop </Link>
                    </div>
                )
            }

        </div>

    );
};

export default AccMyOrdersEl;