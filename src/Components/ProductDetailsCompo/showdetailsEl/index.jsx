import React, { useEffect, useState } from "react";
import { useAddToCart } from "../../../hooks/useAddToCart";
import { useDispatch, useSelector } from "react-redux";
import { setCheckoutProducts } from "../../../redux/features/CheckoutProductSlice/CheckoutProductSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addProductToCart } from "../../../redux/features/CartItemSlice/CartItemSlice";

const ShowDetailsEl = ({ product }) => {
    const { name, price, discountPrice, category, images } = product;
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const dispatch = useDispatch()
    const [addTocartLoader, setAddToCartLoader] = useState(false)
    const cart = useSelector((state) => state.cartItems.values);
    console.log(cart);
    console.log(product);

    
    const [isProductInCart, setIsProductInCart] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const isPresent = cart.find((item) => item.products._id === product?._id)
        if (isPresent) {
            setIsProductInCart(true)
        } else {
            setIsProductInCart(false)
        }
    }, [cart])

    const handleBuyNow = async () => {
        dispatch(setCheckoutProducts([{
            products: product,
            quantity: 1
        }]))

        navigate("/checkout")
    };

    const handleAddToCart = async () => {
        setAddToCartLoader(true)
        const response = await useAddToCart(product._id)
        
        if (response) {
            toast.success("Product added to cart")
            dispatch(addProductToCart({
                products: {
                    _id: product?._id,
                    name: product?.name,
                    images: product?.images,
                    price: Number(product?.price),
                    category: product?.category,
                    description: product?.description,
                    discountPrice: Number(product?.discountPrice),
                },
                quantity: 1
            }))
        }
        setAddToCartLoader(false)
    };

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
            {/* Layout Wrapper */}
            <div className="flex flex-col md:flex-row md:space-x-6">
                {/* Image Section */}
                <div className="flex flex-col items-center md:w-1/2">
                    {/* Main Image */}
                    <div className="w-full flex justify-center mb-4">
                        <img
                            src={selectedImage}
                            alt="Selected Product"
                            className="rounded-lg shadow-lg max-h-96 object-cover w-full md:w-3/4"
                        />
                    </div>
                    {/* Thumbnail Images */}
                    <div className="flex space-x-2 overflow-x-auto">
                        {images.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-16 h-16 object-cover rounded-md border-2 cursor-pointer ${selectedImage === url
                                    ? "border-blue-500"
                                    : "border-gray-300"
                                    }`}
                                onClick={() => setSelectedImage(url)}
                            />
                        ))}
                    </div>
                </div>

                {/* Details Section */}
                <div className="md:w-1/2 mt-6 md:mt-0">
                    {/* Product Name */}
                    <h1 className="text-2xl font-semibold text-gray-800">{name}</h1>

                    {/* Category */}
                    <p className="text-sm text-gray-500 mt-1">Category: {category}</p>

                    {/* Price Section */}
                    <div className="mt-4 flex items-center space-x-4">
                        <span className="text-2xl font-bold text-green-600">
                            ₹{discountPrice}
                        </span>
                        <span className="line-through text-gray-500 text-sm">
                            ₹{price}
                        </span>
                        <span className="text-sm font-medium text-green-700">
                            {Math.round(((price - discountPrice) / price) * 100)}% off
                        </span>
                    </div>

                    {/* Offers */}
                    <div className="mt-6">
                        <h2 className="text-lg font-medium text-gray-800">
                            Available Offers
                        </h2>
                        <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
                            <li>5% Cashback on Credit Card Payments</li>
                            <li>Flat ₹50 off on your first order</li>
                            <li>No Cost EMI starting at ₹42/month</li>
                        </ul>
                    </div>

                    {/* Key Highlights */}
                    <div className="mt-6">
                        <h2 className="text-lg font-medium text-gray-800">
                            Key Highlights
                        </h2>
                        <ul className="mt-2 text-sm text-gray-600 list-disc pl-6">
                            <li>Premium quality Hawan Samagri</li>
                            <li>100% pure and organic ingredients</li>
                            <li>Ideal for all spiritual ceremonies</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-4 w-full justify-center ">
                        <button
                            onClick={handleBuyNow}
                            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
                        >
                            Buy Now
                        </button>
                        {
                            isProductInCart ? (
                                <button
                                    onClick={() => navigate('/account/cart')}
                                    className="bg-green-500 w-36 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
                                >
                                    Go to cart
                                </button>
                            ) : (
                                <button
                                    disabled={addTocartLoader}
                                    onClick={handleAddToCart}
                                    className="bg-green-500 w-36 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
                                >
                                    {addTocartLoader ? <LoadingOutlined /> : 'Add to cart'}
                                </button>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowDetailsEl;
