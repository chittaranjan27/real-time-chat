import axios from 'axios';

const configuredApiUrl =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? "http://localhost:5001/api" : undefined);

if (!configuredApiUrl) {
    throw new Error("VITE_API_URL must be set to the backend API URL in production.");
}

const backendUrl = configuredApiUrl.replace(/\/+$/, "").replace(/\/api$/i, "");
export const API_BASE_URL = `${backendUrl}/api`;

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
}); 