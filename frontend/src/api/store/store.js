import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_URl } from "../http/index.js"; // проверьте, что здесь withCredentials: true по умолчанию
import AuthService from "../services/AuthService.js";
import SearchService from "../services/SearchService.js";
import AddPlayerService from "../services/AddPlayerService.js";

export default class Store {
    user = {};
    results = [];
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
        // Если хотите проверять авторизованность сразу при старте
        // можно вызвать checkAuth() в конструкторе
        this.checkAuth();
    }

    // ----- setters -----
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

    // ----- handleError -----
    handleError(error, defaultMessage) {
        const message = error.response?.data?.message || defaultMessage;
        console.error(message);
        alert(message); // Или toast-уведомление
    }

    // ----- Авторизация -----

    async login(email, password) {
        try {
            await AuthService.login(email, password);
            await this.checkAuth();
        } catch (error) {
            this.handleError(error, "Ошибка авторизации");
        }
    }

    async registration(email, password, password_confirmation) {
        try {
            await AuthService.registration(email, password, password_confirmation);
            // Если бэк сразу логинит — тогда проверяем
            await this.checkAuth();
        } catch (error) {
            this.handleError(error, "Ошибка регистрации");
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URl}/me`, { withCredentials: true });
            // Если запрос прошёл, значит сессия валидна
            this.setAuth(true);
            this.setUser(response.data?.user || {});
        } catch (error) {
            // Если 401, 403 или другая ошибка — значит не авторизован
            console.log(error.response?.data?.message || error.message);
            this.setAuth(false);
            this.setUser({});
        } finally {
            this.setLoading(false);
        }
    }

    async logout() {
        this.setAuth(false);
        this.setUser({});
        this.setResults([]);
        try {
            await AuthService.logout();
        } catch (error) {
            console.error(
                "Ошибка логаута:",
                error.response?.data?.message || error.message
            );
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

    // ----- Пример других запросов -----
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

    async addPlayer(formData) {
        this.setLoading(true);
        try {
            const response = await AddPlayerService.addPlayer(formData);
            this.setResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            this.setLoading(false);
        }
    }
}