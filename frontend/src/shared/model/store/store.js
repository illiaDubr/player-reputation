import {makeAutoObservable} from "mobx";
import {request} from "@shared/lib/request/asyncRequest.js";
import AuthService from "@shared/api/services/AuthService.js";
import {API_URL} from "@shared/api/api.js";
import axios from "axios";
import mainPageService from "@pages/platform/backer/MainPage/config/services/mainPageService.js";

export default class Store {
    user = null;
    isAuth = false;
    isLoading = false;
    //echo = null;

    constructor() {
        makeAutoObservable(this);
    }

    // --- Setters / State management ---

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    // --- Методы авторизации / регистрации ---

    async registration(registrationData) {
        await request({
            asyncFn: () => AuthService.registration(registrationData),
            defaultMessage: "Ошибка при регистрации",
        });
        await this.checkAuth();
    }

    async login(loginData) {
        await request({
            asyncFn: () => AuthService.login(loginData),
            defaultMessage: "Ошибка при логине",
        });
        await this.checkAuth();
    }

    async logout() {
        try {
            await request({
                asyncFn: () => AuthService.logout(),
                defaultMessage: "Ошибка выхода",
                onSuccess: () => {
                    this.setAuth(false);
                    this.setUser({});
                }
            });
        } catch (error) {
            this.setAuth(false);
            this.setUser({});
            throw error;
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/user`, { withCredentials: true });
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

    async createPlayer(createData) {
        await request({
            asyncFn: () => mainPageService.createPlayer(createData),
            defaultMessage: "Ошибка при отправке",
        })
    }

    async backerApproval(setupData) {
        await request({
            asyncFn: () => mainPageService.backerApproval(setupData),
            defaultMessage: "Ошибка при отправке",
        })
    }
}