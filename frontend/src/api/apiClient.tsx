import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://127.0.0.1:5000",
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': 'https://localhost.com:5173',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Credentials',
        "Access-Control-Allow-Credentials": "true"
    }
});

export default apiClient;
