import { useEffect, useState } from "react";
import { Card, Col, Row, InputNumber, Button, Spin } from "antd";
import { DeleteOutlined, LoadingOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateCartItemQuantity } from "../../../redux/features/CartItemSlice/CartItemSlice";
import { useRemoveFromCart } from "../../../hooks/useRemovefromCart";
import toast from "react-hot-toast";
import { useUpdateCartQuantity } from "../../../hooks/useUpdateCartQuantity";
import { setCheckoutProducts } from "../../../redux/features/CheckoutProductSlice/CheckoutProductSlice";
import { useNavigate, useNavigation } from "react-router-dom";

const AccCartEl = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [loadingState, setLoadingState] = useState({});
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cartItems.values);
  const navigate = useNavigate()
  // window.scrollTo(0, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    let amount = 0;
    let discount = 0;

    cartItem.forEach((items) => {
      const productPrice = Number(items.products.price);
      const discountPrice = Number(items.products.discountPrice);
      const quantity = Number(items.quantity);
      amount += productPrice * quantity;
      discount += discountPrice * quantity;
    });

    setTotalAmount(amount);
    setTotalDiscount(discount);
  }, [cartItem]);

  const handleRemove = async (id) => {
    setLoadingState((prev) => ({ ...prev, [id]: true }));
    const response = await useRemoveFromCart(id);
    if (response) {
      dispatch(removeCartItem(id));
      toast.success("Product removed successfully");
    }
    setLoadingState((prev) => ({ ...prev, [id]: false }));
  };

  const handleIncreaseQuantity = async (id, currentQuantity) => {
    const response = await useUpdateCartQuantity(id, currentQuantity + 1)
    if (response) {
      dispatch(updateCartItemQuantity({ id, quantity: currentQuantity + 1 }));
    }
  };

  const handleDecreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateCartItemQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const handleCheckoutClick = async () => {
    console.log(cartItem);
    dispatch(setCheckoutProducts(cartItem))
    navigate("/checkout")

  }

  return (
    <div className="md:px-12 w-full px-6 md:py-6 py-3">
      <h2 className="md:text-3xl text-xl font-bold mb-6 text-gray-800">Your Cart</h2>
      <div className="flex w-full flex-col gap-4">
        {cartItem && cartItem.length ? (
          cartItem.map((items) => {
            const isLoading = loadingState[items.products._id] || false; // Check individual button loading state
            return (
              <div
                className="md:p-6 p-3 bg-white md:shadow-lg shadow-sm rounded-lg flex flex-col lg:flex-row gap-4 sm:max-w-[840px] w-full mx-auto"
                key={items?.products?._id}
              >
                <div className="flex gap-2.5 items-center">
                  <img
                    src={items?.products?.image?.[0]}
                    alt="product image"
                    className="sm:h-28 sm:w-28 h-20 w-20 object-cover rounded"
                  />
                  <h3 className="md:text-xl sm:text-lg text-base font-semibold lg:hidden block">
                    {items?.products?.name}
                  </h3>
                </div>
                <div className="flex flex-col gap-2 flex-grow">
                  <h3 className="sm:text-xl text-sm font-semibold lg:block hidden">
                    {items?.products?.name}
                  </h3>
                  <p className="sm:text-sm text-xs font-light text-[#878787] whitespace-nowrap text-ellipsis overflow-hidden w-[270px] lg:w-full">
                    {items?.products?.descriptions}
                  </p>
                  <span className="text-sm font-semibold text-[#878787] capitalize">
                    {items?.products?.category}
                  </span>

                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
                    <div className="flex gap-4 items-center">
                      <p className="flex gap-3 items-center">
                        <span className="text-sm text-[#878787] line-through">{items?.products?.price}</span>
                        <span className="text-lg text-black">{items?.products?.discountPrice}</span>
                      </p>

                      <p className="flex gap-3 items-center">
                        <PlusOutlined
                          onClick={() => handleIncreaseQuantity(items.products._id, items.quantity)}
                          className="cursor-pointer border border-[#878787] rounded-full p-2"
                        />
                        <span className="w-10 h-6 border border-black text-center">{items.quantity}</span>
                        <MinusOutlined
                          onClick={() => handleDecreaseQuantity(items.products._id, items.quantity)}
                          className="cursor-pointer border border-[#878787] rounded-full p-2"
                        />
                      </p>
                    </div>

                    <Button
                      disabled={isLoading}
                      onClick={() => handleRemove(items?.products?._id)}
                      className="ml-2 active:scale-[.95]"
                      type="primary"
                      danger
                    >
                      {isLoading ? (
                        <>
                          <Spin indicator={<LoadingOutlined spin />} className="mr-2" /> Remove
                        </>
                      ) : (
                        "Remove"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full flex justify-center items-center text-xl text-black opacity-65">
            Empty Cart
          </div>
        )}
      </div>

      {cartItem && cartItem.length ? (
        <div className="p-6 mt-10 bg-white shadow-lg rounded-lg flex flex-col gap-4 min-w-[450px] sm:max-w-[840px] w-full mx-auto">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Total Price:</h2>
            <span> ₹{totalAmount} </span>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Discount:</h2>
            <span>-₹{totalAmount - totalDiscount} </span>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Delivery Charges:</h2>
            <span>Free</span>
          </div>

          <div className="h-px w-full bg-[#87878738]"></div>

          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Total Amount:</h2>
            <span> {totalDiscount} </span>
          </div>

          <div onClick={handleCheckoutClick} className=" w-full mt-4 ">
            <Button type="primary" className="w-full bg-black " block>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AccCartEl;
