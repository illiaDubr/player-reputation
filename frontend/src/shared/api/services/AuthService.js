import $api from "@shared/api/api.js";

export async function getCsrfToken() {
    try {
        await $api.get('/sanctum/csrf-cookie', { withCredentials: true });
        console.log("CSRF-токен успешно получен.");
    } catch (error) {
        console.error("Ошибка получения CSRF-токена:", error);
        throw error;
    }
}

export default class AuthService {
    static async registration(registrationData) {
        await getCsrfToken();
        try {
            const response = await $api.post('/api/register', registrationData);
            return response.data;
        }catch (error) {
            console.error('Ошибка регистрации - service:', error.response?.data || error.message);
            throw error;
        }
    }

    static async login(loginData) {
        await getCsrfToken();
        try {
            const response = await $api.post('/api/login', loginData);
            console.log('Server response login:', response.data);
            return response.data;
        } catch (error) {
            console.error('Ошибка авторизации:', error.response?.data || error.message);
            throw error;
        }
    }

    static async logout() {
        try {
            await getCsrfToken();
            await $api.post('/api/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Ошибка при выходе из системы:', error.response?.data || error.message);
            throw error;
        }
    }
}