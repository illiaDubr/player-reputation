import $api from "../http/index.js"
import {getCsrfToken} from "./csrf.js";

export default class AdminService {
    static async getReturnRecords() {
        await getCsrfToken();

        return $api.get(`/api/changes?status=unread`);
    }

    static async getReports() {
        await getCsrfToken();

        return $api.get(`/api/reports?status=unread`);
    }

    static async getPastReports(pastReportsData) {
        await getCsrfToken();

        const status = pastReportsData.status;

        return $api.get(`/api/reports?status=${status}`);
    }

    static async editTagReport(editReportData) {
        await getCsrfToken();

        const id = editReportData.id;

        return $api.patch(`/api/reports/${id}/status`, editReportData)
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