import { StarFilled } from "@ant-design/icons";

export const Product2El = ({ product }) => {
    return (
        <div
            key={product?.id}
            className="bg-white shadow-md rounded-[10%] p-4 transition-transform duration-300"
        >
            {/* Product Image */}
            <div className="relative w-full h-40 md:h-56 overflow-hidden rounded-lg">
                <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-full bg-blend-color-burn object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                />
                {/* Rating Badge */}
                <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs md:text-sm font-semibold flex items-center gap-1">
                    <StarFilled className="text-white" /> {product?.rating || "4.5"}
                </div>
            </div>
            {/* Product Details */}
            <div className="mt-4 text-center">
                <h3 className="font-bold text-base md:text-lg text-gray-800 truncate">
                    {product?.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                    {product?.discountPrice && (
                        <span className="line-through text-gray-400">
                            ₹{product?.discountPrice}
                        </span>
                    )}
                    <span className="font-bold text-purple-700 ml-2">
                        ₹{product?.price}
                    </span>
                </p>
                <button className="mt-3 px-4 py-2 text-xs md:text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-transform duration-300">
                    Featured Products
                </button>
            </div>
        </div>
    );
};

export default Product2El;
