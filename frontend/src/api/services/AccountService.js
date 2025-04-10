import $api from "../http/index.js"
import {getCsrfToken} from "./csrf.js";

export default class AccountService {
    static async addPlayer(recordData) {
        await getCsrfToken();

        return $api.post('/api/playerAdd', recordData);
    }

    static async backerApproval(backerData) {
        const id = backerData.id

        return $api.put(`api/backers/${id}`, backerData)
    }

    static async profile(profileData) {
        const id = profileData.id

        return $api.patch(`api/backers/${id}/fund-info`, profileData)
    }
}