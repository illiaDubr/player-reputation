import $api from "../http/index.js"
import {getCsrfToken} from "./csrf.js";

export default class AdminService {
    static async getReturnRecords() {
        await getCsrfToken();

        return $api.get(`/api/changes?status=unread`);
    }

    static async getReports() {
        await getCsrfToken();

        return $api.get(`/api/admin/notifications`);
    }

    static async editReport(editReportData) {
        await getCsrfToken();

        const playerId = editReportData.player_id;

        return $api.patch(`/api/players/${playerId}/backer-tag`, editReportData)
    }

    static async getSearchLogs() {
        await getCsrfToken();

        return $api.get(`api/stats/search-players`);
    }





    static async deleteRecord(deleteData) {
        await getCsrfToken();

        const id = deleteData.id;

        return $api.delete(`/api/reports/${id}`, deleteData);
    }
}