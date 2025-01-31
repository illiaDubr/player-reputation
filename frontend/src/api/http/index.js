import axios from "axios";
import {HOMEPAGE_ROUTE} from "../../utils/const.js";

export const API_URl = 'http://203.0.113.10';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URl,
})

// 2. Переписываем перехватчик ответа
$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            console.warn("Пользователь не авторизован. Перенаправляем на /login");
            //window.location.href = HOMEPAGE_ROUTE;
        }
        else if (!error.response) {
            console.error("Ошибка сети:", error.message);
        }

        throw error;
    }
);

export default $api;