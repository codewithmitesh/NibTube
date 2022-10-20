import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://nibtube.herokuapp.com/api",
    withCredentials: true,
})