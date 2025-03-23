import $api from "../http/index.js"
import {getCsrfToken} from "./csrf.js";

export default class AdminService {
    static async getAdminData() {
        await getCsrfToken();

        return $api.get(`/api/admin/notifications`);
    }
}