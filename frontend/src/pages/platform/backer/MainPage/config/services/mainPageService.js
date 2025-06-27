import $api from "@shared/api/api.js";

export default class SearchService {
    static async createPlayer(createData) {
        return $api.post('/api/playerAdd', createData);
    }

    static async backerApproval(setupData) {
        const id = setupData.id

        return $api.put(`api/backers/${id}`, setupData)
    }

    static async profile(id, profileData) {

        return $api.patch(`api/backers/${id}/fund-info`, profileData)
    }
}