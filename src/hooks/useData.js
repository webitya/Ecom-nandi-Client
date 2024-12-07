import toast from "react-hot-toast";
import { useRequestApi } from "./useRequestApi";
import { useDispatch } from "react-redux";

export const useData= () => {
    const dispatch= useDispatch();
    const getData = async (endPoint) => {
        try {
          const response = await useRequestApi(endPoint)
    
          if (response.data) {
            return { data: response.data }
          }
    
        } catch (error) {
          toast.error(error?.response?.data?.message || 'Server Error!');
          return { data: [] }
        }
    }

    const dispatchActionPayload = (action, payload) => {

        if (!payload.length) {
          return;
        }

        dispatch(action(payload))
    }

    const dispatchActionObject = (action, payload) => {
      if(!payload) 
        return;

      dispatch(action(payload))
    }

    return {
        getData,
        dispatchActionPayload,
        dispatchActionObject
    }

}