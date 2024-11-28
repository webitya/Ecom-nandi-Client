import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const CartProductCardEl = ({ product, quantity, onQuantityChange }) => {
    const {
        _id,
        name,
        price,
        discountPrice,
        image,
        category,
        deliveryDate,
        deliveryCharge,
        outOfStock,
    } = product;

    return (
        <div className="flex bg-white shadow-md rounded-lg overflow-hidden mb-4">
            {/* Product Image */}
            <div className="w-1/4">
                <img
                    src={image[0] || "https://via.placeholder.com/150"}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="w-3/4 p-4 flex flex-col justify-between">
                {/* Header */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                    <p className="text-sm text-gray-500">{category}</p>

                    {/* Price Details */}
                    <div className="mt-2">
                        <span className="line-through text-sm text-gray-500">₹{price}</span>
                        <span className="text-lg font-bold text-red-600 ml-2">₹{discountPrice}</span>
                    </div>
                </div>

                {/* Delivery Details */}
                <div className="text-sm text-gray-600 mt-2">
                    {outOfStock ? (
                        <span className="text-red-500 font-bold">Out of Stock</span>
                    ) : (
                        <>
                            <p>Delivery by: <span className="font-semibold">{deliveryDate}</span></p>
                            <p>Delivery Charge: <span className="font-semibold">{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span></p>
                        </>
                    )}
                </div>

                {/* Quantity Controls & Actions */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <MinusOutlined
                            className={`cursor-pointer text-gray-600 ${quantity === 1 && "opacity-50"}`}
                            onClick={() => quantity > 1 && onQuantityChange(_id, "decrease")}
                        />
                        <span className="mx-2">{quantity}</span>
                        <PlusOutlined
                            className="cursor-pointer text-gray-600"
                            onClick={() => onQuantityChange(_id, "increase")}
                        />
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className="bg-gray-200 text-gray-800 py-1 px-3 rounded-md"
                            onClick={() => alert("Saved for later!")}
                        >
                            Save for Later
                        </button>
                        <button
                            className="bg-red-600 text-white py-1 px-3 rounded-md"
                            onClick={() => alert("Item removed from cart")}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProductCardEl;
