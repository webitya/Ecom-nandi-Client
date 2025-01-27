import { useRequestApi } from "./useRequestApi"

export const useGetCurrUser = async () => {
    try {
        const response = await useRequestApi('api/auth/getCurruser')
        return response;

    } catch (error) {
        return null
    }
}