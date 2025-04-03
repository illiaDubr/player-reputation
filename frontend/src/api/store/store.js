import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_URl } from "../http/index.js";
import AuthService from "../services/AuthService.js";
import SearchService from "../services/SearchService.js";
import AccountService from "../services/AccountService.js";
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

    async search(searchData) {
        await this.request(
            () => SearchService.search(searchData),
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

    // --- Методы Личного кабинета ---

    async addPlayer(formData) {
        await this.request(
            () => AccountService.addPlayer(formData),
            "Ошибка добавления игрока",
            (response) => {
                this.setResults(response.data);
                console.log(response.data);
            }
        );
    }

    async backerApproval(backerData) {
        await this.request(
            () => AccountService.backerApproval(backerData),
            "Ошибка авторизации"
        )
    }

    // --- Методы админ панели ---

    async getApprovedBackers() {
        return await this.request(
            () => AdminService.getApprovedBackers(),
            "Ошибка получения данных"
        )
    }

    async getUnApprovedBackers() {
        return await this.request(
            () => AdminService.getUnApprovedBackers(),
            "Ошибка получения данных"
        )
    }

    async approvedBacker(backerData) {
        await this.request(
            () => AdminService.approvedBacker(backerData),
            "Ошибка отправки данных"
        )
    }

    async changeFundBacker(fundData) {
        await this.request(
            () => AdminService.changeFundBacker(fundData),
            "Ошибка отправки данных"
        )
    }

    async getRecords() {
        return await this.request(
            () => AdminService.getRecords(),
            "Ошибка получения данных"
        )
    }

    async changeRecordStatus(changeRecordData) {
        await this.request(
            () => AdminService.changeRecordStatus(changeRecordData),
            "Ошибка получения данных"
        )
    }

    async getDiscussionRecord(){
        return await this.request(
            () => AdminService.getDiscussionRecord(),
            "Ошибка получения данных"
        )
    }

    async getCloseRecord(){
        return await this.request(
            () => AdminService.getCloseRecord(),
            "Ошибка получения данных"
        )
    }

    async getReports(){
        return await this.request(
            () => AdminService.getReports(),
            "Ошибка получения данных"
        )
    }

    async getCloseReports(){
        return await this.request(
            () => AdminService.getCloseReports(),
            "Ошибка получения данных"
        )
    }

    async editTagReport(editReportData) {
        await this.request(
            () => AdminService.editTagReport(editReportData),
            "Ошибка отправки репорта"
        )
    }

    async changeReportStatus(changeReportData) {
        await this.request(
            () => AdminService.changeReportStatus(changeReportData),
            "Ошибка отправки репорта"
        )
    }

    async searchLogs() {
        return await this.request(
            () => AdminService.getSearchLogs(),
            "Ошибка получения данных"
        )
    }

    async download() {
        return this.request(
            () => AdminService.download(),
            "Ошибка получения данных"
        )
    }
}