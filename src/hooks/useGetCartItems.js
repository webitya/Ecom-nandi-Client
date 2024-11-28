import { useRequestApi } from "./useRequestApi";

export const useGetCartItems = async () => {
    try {
        const response = await useRequestApi('api/cart/getMyCart', 'POST');
        return response?.cart || [];
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return [];
    }
};
