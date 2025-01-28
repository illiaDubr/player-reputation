import $api from "../http/index.js";


export default class UserService {
    static async fetchUsers() {
        return $api.get('/users');
    }
}