import { useRequestApi } from "./useRequestApi"

export const useGetBanner = async () => {
    try {
        const response = await useRequestApi('api/owner/getBanner')
        return response;

    } catch (error) {
        return null
    }
}