

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { orderDetailsState } = location.state || {};
    console.log(orderDetailsState);

    if (!orderDetailsState) {
        console.log("sdajbhkfhjksdfkjsdfsdfsfsdf");

        navigate("/sdklfhcv");
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
                <h1 className="text-xl font-semibold text-green-600">
                    Order Placed Successfully!
                </h1>
                <p className="mt-4">
                    <strong>Order ID:</strong> {orderDetailsState.orderId}
                </p>
                <p>
                    <strong>Total Amount:</strong> ₹{orderDetailsState.totalAmount}
                </p>
                <p>
                    <strong>Payment Method:</strong> {orderDetailsState.paymentMethod}
                </p>
                <p>
                    <strong>Delivery Address:</strong>{" "}
                    {orderDetailsState.selectedAddress?.address}
                </p>
                <button
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
                    onClick={() => navigate("/account/orders")}
                >
                    View Orders
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
