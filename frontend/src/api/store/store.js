import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_URl } from "../http/index.js";
import AuthService from "../services/AuthService.js";
import SearchService from "../services/SearchService.js";
import AddPlayerService from "../services/AddPlayerService.js";
import AdminService from "../services/AdminService.js";

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;
    results = [];
    error = "";

    constructor() {
        makeAutoObservable(this);
        this.checkAuth();
    }

    // --- Setters / State management ---

    setError(message) {
        this.error = message;
    }

    resetError() {
        this.error = "";
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

    // --- Обработка ошибок ---
    handleError(error, defaultMessage) {
        const message = error.response?.data?.message || defaultMessage;
        console.error(message);
        this.setError(message);
    }

    /**
     * Универсальный метод для асинхронных операций
     * @param {Function} asyncFn - функция, возвращающая промис (запрос к API)
     * @param {String} defaultMessage - сообщение об ошибке по умолчанию
     * @param {Function} [onSuccess] - колбэк, вызываемый при успешном ответе
     */

    async request(asyncFn, defaultMessage, onSuccess) {
        this.setLoading(true);
        try {
            const response = await asyncFn();
            if (typeof onSuccess === "function") {
                onSuccess(response);
            }
            return response;
        } catch (error) {
            this.handleError(error, defaultMessage);
            throw error;
        } finally {
            this.setLoading(false);
        }
    }

    // --- Методы авторизации / регистрации ---

    async login(loginData) {
        await this.request(
            () => AuthService.login(loginData),
            "Ошибка авторизации",
            () => this.checkAuth()
        )
    }

    async registration(authorizationData) {
        await this.request(
            () => AuthService.registration(authorizationData),
            "Ошибка регистрации - store",
            () => {
                this.resetError();
                this.checkAuth();
            }
        );
    }

    async logout() {
        await this.request(
            () => AuthService.logout(),
            "Ошибка выхода",
            () => {
                this.setAuth(false);
                this.setUser({});
            }
        );
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

    // --- Методы поиска / редактирования ---

    async search(formData) {
        // Пример через универсальный request
        await this.request(
            () => SearchService.search(formData),
            "Ошибка поиска",
            (response) => {
                this.setResults(response.data);
                console.log(response.data);
            }
        );
    }

    async userEdit(payload) {
        await this.request(
            () => SearchService.userEdit(payload),
            "Ошибка редактирования",
            (response) => {
                console.log("userEdit success:", response?.data);
            }
        );
    }

    async report(report) {
        await this.request(
            () => SearchService.report(report),
            "Ошибка отправки репорта",
        );
    }

    async addPlayer(formData) {
        await this.request(
            () => AddPlayerService.addPlayer(formData),
            "Ошибка добавления игрока",
            (response) => {
                this.setResults(response.data);
                console.log(response.data);
            }
        );
    }

    async returnRecords() {
        return await this.request(
            () => AdminService.getReturnRecords(),
            "Ошибка получения данных"
        )
    }

    async reports(){
        return await this.request(
            () => AdminService.getReports(),
            "Ошибка получения данных"
        )
    }

    async editReport(editReportData) {
        await this.request(
            () => AdminService.editReport(editReportData),
            "Ошибка отправки репорта"
        )
    }
}