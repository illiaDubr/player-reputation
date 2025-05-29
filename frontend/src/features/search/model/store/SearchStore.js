import {makeAutoObservable} from "mobx";
import {request} from "@shared/lib/request/asyncRequest.js";
import SearchService from "@features/search/config/services/searchService.js";


export default class SearchStore {
    results = [];
    isLoading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = (bool) => {
        this.isLoading = bool;
    }

    setResults(results) {
        this.results = results;
    }

    setError = (error) => {
        this.error = error;
    }

    async search(searchData) {
        await request({
            asyncFn: () => SearchService.search(searchData),
            setLoading: this.setLoading,
            defaultMessage: "Ошибка поиска",
            onSuccess: (response) => {
                this.setResults(response.data)
                console.log(response.data);
            }
        })
    }

    async report(actionPayload) {
        await request({
            asyncFn: () => SearchService.report(actionPayload),
            defaultMessage: "Ошибка репорта"
        })
    }

    async playerEdit(actionPayload) {
        await request({
            asyncFn: () => SearchService.playerEdit(actionPayload),
            defaultMessage: "Ошибка коректировки"
        })
    }
}