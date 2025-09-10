import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/bmt",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;