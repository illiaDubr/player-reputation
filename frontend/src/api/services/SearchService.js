import $api from "../http/index.js"
import {getCsrfToken} from "./csrf.js";

export default class SearchService {
    static async search(formData) {
        await getCsrfToken();

        return $api.post('/api/search-players', formData);
    }

    static async userEdit(user) {
        await getCsrfToken();

        return $api.put(`/api/players/${user.id}/reputation/`, user);
    }
}