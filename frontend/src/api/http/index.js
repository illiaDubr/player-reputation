import axios from "axios";
import api from "js-cookie";

export const API_URl = 'http://203.0.113.10';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URl,
})

// Перехватчик запросов: добавляет токен в заголовки
$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn('Токен отсутствует!');
    }
    return config;
});

// Перехватчик ответов: обрабатывает ошибки
$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${api}/refresh`, { withCredentials: true });
                localStorage.setItem('token', response.data.accessToken);
                return $api.request(originalRequest);
            } catch (e) {
                console.error('Не удалось обновить токен. Перенаправление на страницу входа.');
                window.location.href = '/login';
            }
        } else if (!error.response) {
            console.error('Ошибка сети:', error.message);
        }
        throw error;
    }
);

export default $api;