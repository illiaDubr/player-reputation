import $api from "../http/index.js"


export default class SearchService {
    static async getCsrfToken() {
        try {
            await $api.get('/sanctum/csrf-cookie', { withCredentials: true });
            console.log("CSRF-токен успешно получен.");
        } catch (error) {
            console.error("Ошибка получения CSRF-токена:", error);
            throw error;
        }
    }

    static async search(formData) {
        await this.getCsrfToken();

        return $api.post('/api/search-players', formData);
    }
}