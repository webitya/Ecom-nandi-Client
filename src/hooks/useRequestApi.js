import axios from "axios";

export const useRequestApi = async (endpoint, method = 'GET', body) => {
    const token = localStorage.getItem('token');

    const isFormData = body instanceof FormData;

    try {
        const response = await axios({
            url: `${import.meta.env.VITE_BASE_URL}/${endpoint}`,
            method: method,
            data: body || undefined,
            headers: {
                'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
