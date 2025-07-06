import axios from "axios";

const API = "http://localhost:8080/api/seguimiento_cultivo";

export const getTimeline = async ( cultivoId ) => {
    try{
        const res = await axios.get(API, {
            params: { cultivoId },
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching timeline:", error.response?.data || error.message);
        throw error;
    }
};