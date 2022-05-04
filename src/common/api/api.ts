import axios, { AxiosInstance } from "axios";
const api: AxiosInstance = axios.create({
    baseURL: "https://www.mocky.io/v2",
    headers: {
        "Content-type": "application/json",
    },
});
export default api;
