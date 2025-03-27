import $api from "../http/index.js"
import {getCsrfToken} from "./csrf.js";

export default class SearchService {
    static async search(searchData) {
        await getCsrfToken();

        return $api.post('/api/search-players', searchData);
    }

    static async userEdit(payload) {
        await getCsrfToken();

        const playerId = payload.player_id;
        const repId = payload.id;

        return $api.patch(`/api/players/${playerId}/reputation/${repId}`, payload);
    }

    static async report(report) {
        await getCsrfToken();

        return $api.post(`/api/reports`, report);
    }
}