import $api from "../http/index.js"

export default class AdminService {
    static async getUnApprovedBackers() {
        return $api.get(`api/backers/unapproved`);
    }

    static async approvedBacker(backerData) {
        const id = backerData.id;

        return  $api.patch(`api/backers/${id}/status`, backerData);
    }

    static changeFundBacker(fundData) {
        const id = fundData.id;

        return  $api.patch(`api/backers/${id}/fund-for-search`, fundData);
    }

    static async getRecords() {
        return $api.get(`/api/changes?status=unread`);
    }

    static async changeRecordStatus(changeRecordData) {
        const id = changeRecordData.id;

        return $api.patch(`/api/changes/${id}`, changeRecordData);
    }

    static async getDiscussionRecord() {
        return $api.get(`/api/changes?status=under_discussion`);
    }

    static async getCloseRecord() {
        return $api.get(`/api/changes?status=read`);
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

    static async download() {
        return $api.get(`/api/backup/download`, { responseType: 'blob' });
    }
}