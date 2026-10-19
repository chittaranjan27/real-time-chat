import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://real-time-chat-2cwb.onrender.com" : "/app",
    withCredentials: true,
}); 
