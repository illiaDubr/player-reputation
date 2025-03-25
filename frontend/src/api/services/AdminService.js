import $api from "../http/index.js"

export default class AdminService {
    static async getReturnRecords() {
        return $api.get(`/api/changes?status=unread`);
    }

    static async getReports() {
        return $api.get(`/api/reports?status=unread`);
    }

    static async getCloseReports() {
        return $api.get(`/api/reports?status=read`);
    }

    static async editTagReport(editReportData) {
        const playerId = editReportData.playerId;

        return $api.patch(`/api/players/${playerId}/backer-tag`, editReportData)
    }

    static async changeReportStatus(changeReportData) {
        const id = changeReportData.id;

        return $api.patch(`/api/reports/${id}/status`, changeReportData)
    }

    static async getSearchLogs() {
        return $api.get(`api/stats/search-players`);
    }
}