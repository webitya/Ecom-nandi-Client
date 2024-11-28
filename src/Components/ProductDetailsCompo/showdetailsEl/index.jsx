import React, { useState } from "react";
import { useAddToCart } from "../../../hooks/useAddToCart";

const ShowDetailsEl = ({ product }) => {
    const { name, price, discountPrice, category, image } = product;
    const [selectedImage, setSelectedImage] = useState(image[0]);

    const handleBuyNow = async () => {

    };

    const handleAddToCart = async () => {
        const response = await useAddToCart(product._id)

        if (response) {
            toast.success("Product added to cart")
            dispatch(addProductToCart({
                product: {
                    _id: product?._id,
                    name: product?.name,
                    image: product?.image,
                    price: Number(product?.price),
                    category: product?.category,
                    description: product?.description,
                    discountPrice: Number(product?.discountPrice),
                },
                quantity: 1
            }))
        }
        // Add your logic for adding the product to the cart
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
                        {image.map((url, index) => (
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
                        <button
                            onClick={handleAddToCart}
                            className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowDetailsEl;
