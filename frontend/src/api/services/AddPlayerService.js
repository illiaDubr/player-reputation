import $api from "../http/index.js"
import {getCsrfToken} from "./csrf.js";

export default class AddPlayerService{
    static async addPlayer(formData) {
        await getCsrfToken();

        return $api.post('/api/playerAdd', formData);
    }
}