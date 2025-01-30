import $api from "../http/index.js";

export async function getCsrfToken() {
    try {
        await $api.get('/sanctum/csrf-cookie', { withCredentials: true });
        console.log("CSRF-токен успешно получен.");
    } catch (error) {
        console.error("Ошибка получения CSRF-токена:", error);
        throw error;
    }
}