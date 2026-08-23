import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/api/auth/login") &&
            !originalRequest.url?.includes("/api/auth/refresh")
        ) {
            originalRequest._retry = true;
            try {
                await api.post("/api/auth/refresh");
                return api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
