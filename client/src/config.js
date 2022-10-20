import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://nibtube.herokuapp.com/api",
    // baseURL: "http://localhost:5000/api",
    withCredentials: true,
})