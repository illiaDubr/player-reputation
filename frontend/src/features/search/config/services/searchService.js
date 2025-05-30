import $api from "@shared/api/api.js";

export default class SearchService {
    static async search(searchData) {
        return $api.post('/api/search-players', searchData);
    }

    static async report(actionPayload) {
        return $api.post(`/api/reports`, actionPayload);
    }

    static async playerEdit(actionPayload) {
        const playerId = actionPayload.player_id;
        const repId = actionPayload.id;

        return $api.patch(`/api/players/${playerId}/reputation/${repId}`, actionPayload);
    }
}