import { useRequestApi } from "./useRequestApi";

export const useRemoveFromCart = async (id) => {
    try {
        const response = await useRequestApi('api/cart/deleteCart', 'POST', {
            productId: id
        })
        return response
    } catch (error) {
        console.log(error);
        toast.success(error?.response?.data?.message || 'failed remove product from cart')
        return null
    }
}