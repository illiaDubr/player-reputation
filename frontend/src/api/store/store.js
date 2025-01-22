import AuthService from "../services/AuthService.js";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_URl } from "../http/index.js";
import SearchService from "../services/SearchService.js";

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
        console.log('Отправляемые данные:', { email, password });
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(email, password, password_confirmation) {
        event.preventDefault();
        console.log('Отправляемые данные:', { email, password, password_confirmation });
        try {
            const response = await AuthService.registration(email, password, password_confirmation);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
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
}