import $api from "../http/index.js";


export default class AuthService {
    static async getCsrfToken() {
        try {
            await $api.get('/sanctum/csrf-cookie', { withCredentials: true });
            console.log("CSRF-токен успешно получен.");
        } catch (error) {
            console.error("Ошибка получения CSRF-токена:", error);
            throw error;
        }
    }

    static async login(email, password) {
        await this.getCsrfToken();
        return $api.post('/api/login', { email, password });
    }

    static async registration(email, password, password_confirmation) {
        await this.getCsrfToken();
        return $api.post('/api/register', { email, password, password_confirmation });
    }

    static async logout() {
        await this.getCsrfToken();
        return $api.post('/api/logout');
    }

    static async verification(email) {
        return $api.post('/api/email/verification-notification', { email });
    }

    static async newPassword() {

    }
}