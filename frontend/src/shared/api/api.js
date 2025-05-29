import axios from "axios";
import {ROUTES} from "@shared/config/routes.js";

export const API_URL = import.meta.env.VITE_API_URL;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    validateStatus: (status) => status >= 200 && status < 300,
});

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            console.warn("Пользователь не авторизован. Перенаправляем на /login");
            window.location.href = ROUTES.PORTAL.HOME;
        } else if (!error.response) {
            console.error("Ошибка сети:", error.message);
        }

        throw error;
    }
);

export default $api;