import $api from "@shared/api/api.js";

export default class AdminService {
    static async getApprovedBackers() {
        return $api.get(`api/backers/approved`);
    }

    static async getUnApprovedBackers() {
        return $api.get(`api/backers/unapproved`);
    }

    static async approvedBacker(approved) {
        const id = approved.id;

        return  $api.patch(`api/backers/${id}/status`, approved);
    }

    static changeFundBacker(fundData) {
        const id = fundData.id;

        return  $api.patch(`api/backers/${id}/fund-for-search`, fundData);
    }

    static async download() {
        return $api.get(`/api/backup/download`, { responseType: 'blob', withCredentials: true });
    }
}