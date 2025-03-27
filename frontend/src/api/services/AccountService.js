import $api from "../http/index.js"
import {getCsrfToken} from "./csrf.js";

export default class AccountService {
    static async addPlayer(formData) {
        await getCsrfToken();

        return $api.post('/api/playerAdd', formData);
    }

    static async backerApproval() {
        const id = id

        return $api.patch(`api/backers/${id}/status`,)
    }
}