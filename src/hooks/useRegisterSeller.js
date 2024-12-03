import toast from "react-hot-toast";
import { useRequestApi } from "./useRequestApi"

export const useRegisterSeller = async(serverData) => {
    console.log(serverData);
    try{
        const response= await useRequestApi('api/role/requestSellerRequest', 'POST', serverData)
        return response.message;
    } catch(error) {
        toast.error(error?.respose?.data?.message || "Server error")
        return null
    }
}