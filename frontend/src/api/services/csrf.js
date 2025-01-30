import $api from "../http/index.js";
import Cookies from 'js-cookie';

export async function getCsrfToken() {
    try {
        const csrfToken = Cookies.get('XSRF-TOKEN');
        if (!csrfToken) {
            // Если токена нет, запрашиваем его
            await $api.get('/sanctum/csrf-cookie', { withCredentials: true });
            console.log("CSRF-токен успешно получен.");
        } else {
            console.log("CSRF-токен уже установлен.");
        }
    } catch (error) {
        console.error("Ошибка получения CSRF-токена:", error);
        throw error;
    }
}