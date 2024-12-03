import { DollarOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useAddToCart } from "../../hooks/useAddToCart";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/features/CartItemSlice/CartItemSlice";
import { setCheckoutProducts } from "../../redux/features/CheckoutProductSlice/CheckoutProductSlice";

const ProductCardEl = ({ product }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cartItems.values)

    const handleProductClick = (id) => {
        navigate(`/productdetails?s=${id}`)
    }
    const handleAddToClick = async (id) => {
        const response = await useAddToCart(id)

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
    }

    const handleBuyNow = () => {
        console.log("product -> ", product);
        console.log("cart -> ", cart);
        dispatch(setCheckoutProducts([{
            products: product,
            quantity: 1
        }]))

        navigate("/checkout")
    }
    return (
        <Card
            hoverable
            className="relative rounded-lg overflow-hidden shadow-md border border-gray-300 transition-transform duration-300 max-w-[300px] transform hover:scale-105"
            cover={
                <div className="relative  w-full h-[140px] md:h-[200px] bg-gray-200 overflow-hidden">
                    <img
                        onClick={() => handleProductClick(product._id)}
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                    {/* Add to Cart Icon */}
                    <div onClick={() => handleAddToClick(product._id)} className="absolute top-2 right-2 bg-blue-600 text-white p-1 md:p-2 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition duration-300">
                        <ShoppingCartOutlined className="text-sm md:text-lg" />
                    </div>
                </div>
            }
        >
            {/* Product Name */}
            <div className="mb-1">
                <h3 className="text-sm md:text-base font-medium text-gray-800 truncate">
                    {product.name}
                </h3>
            </div>

            {/* Wishlist and Price Section */}
            <div className="flex items-center justify-between mb-3">
                <HeartOutlined className="text-gray-400 hover:text-red-500 cursor-pointer transition duration-300 ease-in-out text-sm md:text-lg" />
                <div>
                    {product.price && (
                        <p className="text-xs md:text-sm text-gray-500 line-through">
                            ₹{product.price}
                        </p>
                    )}
                    <p className="text-sm md:text-base font-bold text-gray-900">
                        ₹{product.discountPrice}
                    </p>
                </div>
            </div>

            {/* Buy Now Button */}
            <button
                onClick={handleBuyNow}
                className="w-full bg-black text-white font-medium text-xs md:text-sm py-1 md:py-2 rounded-md shadow-md hover:shadow-lg hover:bg-gray-800 transition-all duration-300"
            >
                <DollarOutlined className="mr-1" />
                Buy Now
            </button>
        </Card>
    );
};

export default ProductCardEl;
