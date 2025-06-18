import $api from "@shared/api/api.js";

export default class AdminService {
    static async getApprovedBackers() {
        return $api.get(`api/backers/approved`);
    }

    static async getUnApprovedBackers() {
        return $api.get(`api/backers/unapproved`);
    }
}