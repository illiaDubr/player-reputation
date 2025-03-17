import $api from "../http/index.js";
import {getCsrfToken} from "./csrf.js";

export default class AuthService {
    static async login(email, password) {
        await getCsrfToken();
        try {
            const response = await $api.post('/api/login', { email, password }, {withCredentials: true});
            console.log('Server response login:', response.data);
            return response.data;
        } catch (error) {
            console.error('Ошибка авторизации:', error.response?.data || error.message);
            throw error;
        }
    }

    static async registration(authorizationData) {
        await getCsrfToken();
        try {
            const response = await $api.post('/api/register', authorizationData);
            return response.data;
        } catch (error) {
            console.error('Ошибка регистрации - service:', error.response?.data || error.message);
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

    static async verification(email) {
        return $api.post('/api/email/verification-notification', { email });
    }
}