import toast from "react-hot-toast";
import { useRequestApi } from "./useRequestApi"


export const useAddToCart = async (id) => {
    try {
        const response = await useRequestApi('api/cart/addToCart', 'POST', {
            productId: id
        })
        return response.cart
    } catch (error) {
        console.log(error);
        toast.success(error?.response?.data?.message || 'failed add product to  cart')
        return null
    }
}