
import { useRequestApi } from "./useRequestApi"

export const useGetCategory = async () => {
    try {
        const response = await useRequestApi('api/owner/getCategories')
        return response;

    } catch (error) {
        return null
    }
}