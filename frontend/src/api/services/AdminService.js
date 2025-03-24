import $api from "../http/index.js"
import {getCsrfToken} from "./csrf.js";

export default class AdminService {
    static async getAdminData() {
        await getCsrfToken();

        return $api.get(`/api/admin/notifications`);
    }

    static async editReport(editReportData) {
        await getCsrfToken();

        const playerId = editReportData.player_id;

        return $api.patch(`/api/players/${playerId}/backer-tag`, editReportData)
    }
}