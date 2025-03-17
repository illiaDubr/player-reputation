import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_URl } from "../http/index.js";
import AuthService from "../services/AuthService.js";
import SearchService from "../services/SearchService.js";
import AddPlayerService from "../services/AddPlayerService.js";
import UserService from "../services/SearchService.js";

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;
    results = [];

    constructor() {
        makeAutoObservable(this);
        this.checkAuth();
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setResults(results) {
        this.results = results;
    }

    handleError(error, defaultMessage) {
        const message = error.response?.data?.message || defaultMessage;
        console.error(message);
        //alert(message);
    }

    async login(email, password) {
        try {
            await AuthService.login(email, password);
            await this.checkAuth();
        } catch (error) {
            this.handleError(error, "Ошибка авторизации");
        }
    }

    async registration(authorizationData) {
        try {
            await AuthService.registration(authorizationData);
            await this.checkAuth();
        } catch (error) {
            this.handleError(error, "Ошибка регистрации");
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URl}/api/user`, { withCredentials: true });
            this.setAuth(true);
            this.setUser(response.data);
        } catch (error) {
            console.warn("Пользователь не авторизован:", error);
            this.setAuth(false);
            this.setUser({});
        } finally {
            this.setLoading(false);
        }
    }

    async logout() {
        this.setLoading(true);
        try {
            await AuthService.logout();
            this.setAuth(false);
            this.setUser({});
        } catch (error) {
            console.error("Ошибка выхода:", error);
        } finally {
            this.setLoading(false);
        }
    }

    async verification(email) {
        try {
            const response = await AuthService.verification(email);
            console.log(response);
        } catch (error) {
            console.log(error.response?.data?.message || error.message);
        }
    }

    async search(formData) {
        this.setLoading(true);
        try {
            const response = await SearchService.search(formData);
            this.setResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
            this.setResults([]);
        } finally {
            this.setLoading(false);
        }
    }

    async userEdit(payload) {
        this.setLoading(true);
        try {
            const response = await UserService.userEdit(payload);
        } catch (error) {
            console.log(error);
            this.handleError(error);
        } finally {
            this.setLoading(false);
        }
    }

    async addPlayer(formData) {
        this.setLoading(true);
        try {
            const response = await AddPlayerService.addPlayer(formData);
            this.setResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
            this.handleError(error);
        } finally {
            this.setLoading(false);
        }
    }
}