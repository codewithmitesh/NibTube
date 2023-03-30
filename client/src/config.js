import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://nibtube.onrender.com/api",
    // baseURL: "http://localhost:5000/api",
    withCredentials: true,
    // this is new one
    headers: { 'Content-Type': 'application/json' },

})