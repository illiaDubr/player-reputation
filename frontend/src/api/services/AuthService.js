import $api from "../http/index.js";
import {getCsrfToken} from "./csrf.js";

export default class AuthService {
    static async login(email, password) {
        await getCsrfToken();
        return $api.post('/api/login', { email, password });
    }

    static async registration(email, password, password_confirmation) {
        await getCsrfToken();
        return $api.post('/api/register', { email, password, password_confirmation });
    }

    static async logout() {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Токен отсутствует, логаут невозможен!');
            return;
        }
        await getCsrfToken();
        return $api.post('/api/logout');
    }

    static async verification(email) {
        return $api.post('/api/email/verification-notification', { email });
    }
}