import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_URl } from "../http/index.js";
import AuthService from "../services/AuthService.js";
import SearchService from "../services/SearchService.js";
import AddPlayerService from "../services/AddPlayerService.js";

export default class Store {
    user = {}
    results = [];
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
        this.initializeAuth();
    }

    initializeAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            this.checkAuth();
        }
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

    //<<== Authorization ==>>//


    updateAuthState(response) {
        const token = response.data?.accessToken;
        if (!token) {
            console.error('Токен отсутствует в ответе!');
            return false;
        }
        localStorage.setItem('token', token);
        this.setAuth(true);
        this.setUser(response.data.user);
        console.log('Пользователь успешно авторизован:', response.data.user);
        return true;
    }

    handleError(error, defaultMessage) {
        const message = error.response?.data?.message || defaultMessage;
        console.error(message);
        alert(message); // Или замени на toast
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            this.updateAuthState(response);
        } catch (error) {
            this.handleError(error, 'Ошибка авторизации');
        }
    }

    async registration(email, password, password_confirmation) {
        try {
            const response = await AuthService.registration(email, password, password_confirmation);
            this.updateAuthState(response);
        } catch (error) {
            this.handleError(error, 'Ошибка регистрации');
        }
    }

    async logout() {
        this.setAuth(false);
        this.setUser({});
        this.setResults([]);
        localStorage.removeItem('token');
        try {
            await AuthService.logout();
        } catch (error) {
            console.error('Ошибка логаута:', error.response?.data?.message || error.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URl}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async verification(email) {
        try {
            const response = await AuthService.verification(email);
            console.log(response);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    //<<== Form submission ==>>//

    async search(formData) {
        this.setLoading(true);
        try {
            const response = await SearchService.search(formData);
            this.setResults(response.data);
            console.log(response.data);
        } catch (e) {
            console.log(e);
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
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }
}