import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api/",
    headers: {
        "Content-type": "application/json",
    },
})

export default axiosInstance