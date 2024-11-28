import toast from "react-hot-toast";
import { useRequestApi } from "./useRequestApi";


export const useUpdateCartQuantity = async (id, quantity) => {
    try {
        const response = await useRequestApi('api/cart/updateCartQuantity', 'POST', {
            productId: id,
            quantity: quantity
        })
        return response
    } catch (error) {
        console.log(error);
        toast.success(error?.response?.data?.message || 'failed update product quantity in cart')
        return null
    }
}