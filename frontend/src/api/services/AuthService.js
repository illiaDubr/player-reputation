import $api from "../http/index.js";
import {getCsrfToken} from "./csrf.js";
import Cookies from 'js-cookie';

async function ensureCsrfToken() {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    if (!csrfToken) {
        await getCsrfToken();
    }
}

export default class AuthService {
    static async login(email, password) {
        try {
            await ensureCsrfToken();
            const response = await $api.post('/api/login', { email, password });
            console.log('Server response login:', response.data);
            return response.data;
        } catch (error) {
            console.error('Ошибка авторизации:', error.response?.data || error.message);
            throw error;
        }
    }

    static async registration(email, password, password_confirmation) {
        try {
            await ensureCsrfToken();
            const response = await $api.post('/api/register', { email, password, password_confirmation });
            return response.data;
        } catch (error) {
            console.error('Ошибка регистрации:', error.response?.data || error.message);
            throw error;
        }
    }

    static async logout() {
        const token = localStorage.getItem('token');
        if (!token) {
            console.warn('Токен отсутствует, логаут невозможен. Перенаправление на страницу входа...');
            //window.location.href = '/login';
            return;
        }
        try {
            await ensureCsrfToken();
            await $api.post('/api/logout');
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Ошибка при выходе из системы:', error.response?.data || error.message);
            throw error;
        }
    }

    static async verification(email) {
        return $api.post('/api/email/verification-notification', { email });
    }
}