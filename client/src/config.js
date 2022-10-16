import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://nibtube.herokuapp.com",
    withCredentials: true,
    // headers: {
    //     'Access-Control-Allow-Origin': 'http://localhost:5000', 'Content-Type': 'application/json'
    // }
})