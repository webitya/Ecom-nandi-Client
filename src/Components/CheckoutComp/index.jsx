import { useEffect, useState } from "react";
import { useRequestApi } from "../../hooks/useRequestApi";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../redux/features/addressSlices/AddressSlice";
import { Modal, Button, Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { WarningModel } from "../../Shared/warningModel";

const CheckoutCompo = () => {
    const userAddress = useSelector((state) => state.address.value);
    const products = useSelector((state) => state.checkoutProducts.value);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
    const [newAddress, setNewAddress] = useState({
        fullName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        contactNo: "",
    });
    const [paymentType, setPaymentType] = useState("");
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [pamentLoading, setPamentLoading] = useState(false)

    window.scrollTo(0, 0);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await useRequestApi("api/address/getAddress");
                dispatch(setAddress(response.data));
            } catch (error) {
                console.error("Error fetching addresses: ", error);
            }
        };

        if (!userAddress.length) {
            fetchAddress();
        }

        const initialTotal = products.reduce(
            (sum, item) => sum + item.products.discountPrice * item.quantity,
            0
        );
        setTotalAmount(initialTotal);
    }, [dispatch, userAddress.length, products]);

    const handleAddAddress = () => {
        if (
            !newAddress.fullName ||
            !newAddress.address ||
            !newAddress.city ||
            !newAddress.state ||
            !newAddress.zipCode ||
            !newAddress.contactNo
        ) {
            <WarningModel />
            return;
        }

        const savedAddress = { ...newAddress, _id: Date.now().toString() };
        setSelectedAddress(savedAddress);
        dispatch(setAddress([...userAddress, savedAddress]));
        setIsAddressFormOpen(false);
        setNewAddress({
            fullName: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            contactNo: "",
        });
    };

    const handlePayment = async () => {
        if (!selectedAddress) {
            setErrorMessage("Please select an address.");
            setIsErrorModalOpen(true);
            return;
        }

        if (!paymentType) {
            setErrorMessage("Please select a payment method.");
            setIsErrorModalOpen(true);
            return;
        }

        setIsPaymentModalOpen(true);
    };

    const handleErrorModalClose = () => {
        setIsErrorModalOpen(false);
        setErrorMessage("");
    };

    const initiateRazorpayPayment = async () => {
        const options = {
            key: "rzp_test_fOsTScdkbhACcC",
            amount: totalAmount * 100,
            currency: "INR",
            name: "Awesome T-Shirt",
            description: "Sample Product",
            image: "https://example.com/logo.png",
            handler: async function (response) {
                await createOrder(response.razorpay_payment_id, "online");
            },
            prefill: {
                name: "John Doe",
                email: "johndoe@example.com",
                contact: "9876543210",
            },
            theme: {
                color: "#007BFF",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response) => {
            alert("Payment Failed: " + response.error.description);
        });
        rzp.open();
    };

    const createOrder = async (paymentId, paymentMethod) => {
        setPamentLoading(true)

        try {
            const order = {
                products: products.map((item) => (
                    {
                        productId: item.products._id,
                        quantity: item.quantity,
                        discountPrice: item.products.discountPrice,
                        name: item.products.name,
                        image: item.products.image,
                        description: item.products.description,
                        totalPrice: item.products.discountPrice * item.quantity,
                    }
                )),
                totalAmount,
                selectedAddress: {
                    fullName: selectedAddress.fullName,
                    address: selectedAddress.address,
                    city: selectedAddress.city,
                    state: selectedAddress.state,
                    zipCode: selectedAddress.zipCode,
                    contactNo: selectedAddress.contactNo,
                },
                paymentMethod,
                paymentId,
                pamentStatus: paymentMethod === 'online' ? 'paid' : 'pending'
            };

            const response = await useRequestApi("api/order/createOrder", 'POST', order
            );

            if (response) {
                setOrderDetails(response.data);
                setIsPaymentModalOpen(false)
                setIsOrderSuccessModalOpen(true);
                navigate('/account/order')
                console.log("Order Details:", response.data);
            } else {
                toast.error("Failed to create order.");
            }
        } catch (error) {
            console.error("Error creating order: ", error);
        } finally {
            setPamentLoading(false)
        }
    };

    if (pamentLoading) {
        window.scrollTo(0, 0);
        return (
            <div className="flex justify-center items-center flex-col h-screen">
                <Spin />
                <p>pament processing ...</p>
            </div>
        )
    }
    return (
        <div>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Checkout</h1>

                {/* Product Details Section */}
                <div className="bg-white p-4 rounded-md shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-3">Order Details</h2>
                    <ul className="space-y-4">
                        {products.map((item) => (
                            <li
                                key={item._id}
                                className="flex items-start space-x-4 bg-gray-50 p-3 rounded-md"
                            >
                                <img
                                    src={item.products.image[0]}
                                    alt={item.products.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{item.products.name}</h3>
                                    <p className="text-gray-500">
                                        Category: {item.products.category}
                                    </p>
                                    <div className="text-gray-700">
                                        <span className="line-through text-gray-400">
                                            ₹{item.products.price}
                                        </span>{" "}
                                        <span className="text-green-600">
                                            ₹{item.products.discountPrice}
                                        </span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => handleQuantityChange(item._id, false)}
                                            className="px-3 py-1 bg-gray-200 rounded-md"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item._id, true)}
                                            className="px-3 py-1 bg-gray-200 rounded-md"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Address Section */}
                <div className="bg-white p-4 rounded-md shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
                    <div className="space-y-4">
                        {userAddress.length > 0 ? (
                            userAddress.map((addr) => (
                                <div
                                    key={addr._id}
                                    className="flex items-center space-x-3"
                                >
                                    <input
                                        type="radio"
                                        id={addr._id}
                                        name="address"
                                        value={addr._id}
                                        onChange={() => setSelectedAddress(addr)}
                                        className="h-4 w-4 text-blue-600"
                                    />
                                    <label htmlFor={addr._id} className="flex-grow">
                                        <div className="font-semibold">{addr.fullName}</div>
                                        <div>
                                            {addr.address}, {addr.city}, {addr.state},{" "}
                                            {addr.zipCode}
                                        </div>
                                        <div>{addr.contactNo}</div>
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p>No addresses found.</p>
                        )}
                        <button
                            onClick={() => setIsAddressFormOpen(true)}
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                        >
                            Add New Address
                        </button>
                    </div>
                </div>

                {/* Payment Method Section */}
                <div className="bg-white p-4 rounded-md shadow-md mb-6">
                    <h2 className="text-xl font-semibold mb-3">Payment Method</h2>
                    <div className="flex flex-col space-y-3">
                        <label>
                            <input
                                type="radio"
                                name="paymentType"
                                value="online"
                                onChange={(e) => setPaymentType(e.target.value)}
                                className="mr-2"
                            />
                            Online Payment
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentType"
                                value="cod"
                                onChange={(e) => setPaymentType(e.target.value)}
                                className="mr-2"
                            />
                            Cash on Delivery
                        </label>
                    </div>
                </div>
                <div className=" bg-black text-white font-semibold p-4 rounded-md mb-3 w-full flex justify-between text-xl ">
                    <p> Total Amount: </p>
                    <p>{totalAmount}</p>
                </div>

                {/* Proceed to Pay Button */}
                <Button
                    type="primary"
                    size="large"
                    onClick={handlePayment}
                    className="w-full bg-green-500 hover:bg-green-600"
                >
                    Proceed to Pay
                </Button>
            </div>

            {/* Address Form Modal */}
            <Modal
                title="Add New Address"
                open={isAddressFormOpen}
                onOk={handleAddAddress}
                onCancel={() => setIsAddressFormOpen(false)}
                okText="Save"
                cancelText="Cancel"
            >
                <div className="space-y-3">
                    <Input
                        value={newAddress.fullName}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, fullName: e.target.value })
                        }
                        placeholder="Full Name"
                    />
                    <Input
                        value={newAddress.address}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, address: e.target.value })
                        }
                        placeholder="Address"
                    />
                    <Input
                        value={newAddress.city}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, city: e.target.value })
                        }
                        placeholder="City"
                    />
                    <Input
                        value={newAddress.state}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, state: e.target.value })
                        }
                        placeholder="State"
                    />
                    <Input
                        value={newAddress.zipCode}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, zipCode: e.target.value })
                        }
                        placeholder="Zip Code"
                    />
                    <Input
                        value={newAddress.contactNo}
                        onChange={(e) =>
                            setNewAddress({ ...newAddress, contactNo: e.target.value })
                        }
                        placeholder="Contact Number"
                    />
                </div>
            </Modal>

            {/* Payment Confirmation Modal */}
            <Modal
                title="Payment Confirmation"
                open={isPaymentModalOpen}
                onCancel={() => setIsPaymentModalOpen(false)}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => setIsPaymentModalOpen(false)}
                        className="bg-gray-300 text-black"
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="confirm"
                        type="primary"
                        onClick={paymentType === "online" ? initiateRazorpayPayment : () => { createOrder(null, "cod"); setIsPaymentModalOpen(false) }}
                    >
                        {paymentType === 'online' ? 'Confirm Pament' : 'Confirm Order'}
                    </Button>,
                ]}
            >
                <p>Your total amount is ₹{totalAmount}</p>
                <p>Payment Method: {paymentType === "online" ? "Online Payment" : "Cash on Delivery"}</p>
            </Modal>

            <Modal
                title="Order Placed Successfully!"
                open={isOrderSuccessModalOpen}
                onCancel={() => setIsOrderSuccessModalOpen(false)}
                footer={[
                    <Button
                        key="viewOrder"
                        type="primary"
                        onClick={() => {
                            // Redirect user to the order page
                            window.location.href = "/account/order";
                        }}
                    >
                        View Order
                    </Button>,
                ]}
            >
                <p>Your order has been placed successfully. Order ID: {orderDetails?.orderId}</p>
                <p>Total Amount: ₹{orderDetails?.totalAmount}</p>
                <p>Payment Method: {orderDetails?.paymentMethod}</p>
                <p>Delivery Address: {orderDetails?.selectedAddress.address}</p>
            </Modal>

            <Modal
                title="Error"
                open={isErrorModalOpen}
                onOk={handleErrorModalClose}
                onCancel={handleErrorModalClose}
                okText="Okay"
            >
                <p>{errorMessage}</p>
            </Modal>

        </div>
    );
};

export default CheckoutCompo;
