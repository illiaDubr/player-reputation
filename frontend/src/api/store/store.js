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

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            console.log('Ответ сервера:', response.data);
            const token = response.data.accessToken;
            if (token) {
                localStorage.setItem('token', token);
                this.setAuth(true);
                this.setUser(response.data.user);
            } else {
                console.error('Токен не получен!');
            }
        } catch (e) {
            console.error(e.response?.data?.message || 'Ошибка логина');
        }
    }

    async registration(email, password, password_confirmation) {
        try {
            const response = await AuthService.registration(email, password, password_confirmation);
            console.log('Ответ сервера:', response.data);

            const token = response.data.accessToken; // Убедись, что токен есть в ответе
            if (token) {
                localStorage.setItem('token', token); // Сохраняем токен
                this.setAuth(true); // Обновляем состояние
                this.setUser(response.data.user);
            } else {
                console.error('Токен отсутствует в ответе!');
            }
        } catch (e) {
            console.error('Ошибка регистрации:', e.response?.data?.message || e.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
        } catch (e) {
            console.log(e.response?.data?.message || 'Ошибка логаута');
        } finally {
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
            this.setResults([]);
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
            console.log(response);
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }
}