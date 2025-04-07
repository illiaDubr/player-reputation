import $api from "../http/index.js"
import {getCsrfToken} from "./csrf.js";

export default class AccountService {
    static async addPlayer(formData) {
        await getCsrfToken();

        return $api.post('/api/playerAdd', formData);
    }

    static async backerApproval(backerData) {
        const id = backerData.id

        return $api.put(`api/backers/${id}`, backerData)
    }
}