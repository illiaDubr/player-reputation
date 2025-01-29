import axios from "axios";

export const API_URl = 'http://203.0.113.10';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URl,
})

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.warn('Токен отсутствует!');
    }
    return config;
});

$api.interceptors.response.use(config => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URl}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН');
        }
    }
    throw error;
});

export default $api;