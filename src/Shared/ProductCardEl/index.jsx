import { DollarOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";

const ProductCardEl = ({ product }) => {
    return (
        <Card
            hoverable
            className="relative min-w-[185px]  rounded-xl overflow-hidden shadow-lg border border-gray-100 transition-transform transform sm:hover:scale-105"
            cover={
                <div className="relative w-full h-[160px] md:h-[250px] bg-gray-100 overflow-hidden">
                    <img
                        src={product.image[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                    {/* Add to Cart Icon */}
                    <div className="absolute top-3 right-3 bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition duration-300">
                        <ShoppingCartOutlined className="text-lg" />
                    </div>
                </div>
            }
        >
            {/* Product Name and Wishlist */}
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">
                    {product.name}
                </h3>
                <HeartOutlined className="text-gray-400 hover:text-red-500 cursor-pointer transition duration-300 ease-in-out text-xl" />
            </div>

            {/* Price Section */}
            <div className="flex items-center justify-between mb-2">
                {product.price && (
                    <p className="text-sm text-gray-500 line-through">
                        ₹{product.price}
                    </p>
                )}
                <p className="text-lg sm:text-xl font-semibold text-gray-900">
                    ₹{product.discountPrice}
                </p>
            </div>

            {/* Buy Now Button */}
            <div className="flex justify-center mt-2">
                <button
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-md hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                >
                    <DollarOutlined className="mr-2 text-lg" />
                    Buy Now
                </button>
            </div>
        </Card>
    );
};

export default ProductCardEl;
