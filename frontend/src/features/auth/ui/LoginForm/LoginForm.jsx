import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schemaLogin} from "@features/auth/model/authSchema.js";
import Input from "@shared/ui/Input/index.js";
import styles from "../AuthFormBase.module.scss"
import {useStore} from "@app/providers/index.jsx";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@shared/config/routes.js";

const ROLE_REDIRECTS = {
    admin: ROUTES.ADMIN.HOME,
    backer: ROUTES.PLATFORM.MAIN_PAGE,
};

const LoginForm = () => {
    const { store } = useStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(schemaLogin),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        try {
            const loginData = { ...data };
            await store.login(loginData);
            const role = store.user?.role;
            navigate(ROLE_REDIRECTS[role] || "/");
        } catch (error) {
            setError("email", {
                type: "server",
                message: "Неверный email или пароль",
            });
            setError("password", {
                type: "server",
                message: "Неверный email или пароль",
            });
        }
    }

    return (
        <>
            <div className={`${styles[`auth__title`]}`} style={{textAlign:"right"}}>
                Вход
            </div>
            <form className={`${styles[`auth__form`]}`} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Input
                    label="Почта"
                    type="email"
                    placeholder="Введите почту"
                    {...register("email")}
                    error={errors.email}
                />
                <Input
                    label="Пароль"
                    type="password"
                    placeholder="Введите пароль"
                    {...register("password")}
                    error={errors.password}
                />
                <button className={`${styles[`auth__form-btn`]}`} type="submit">
                    {isSubmitting ? 'Загрузка...' : 'Войти'}
                </button>
            </form>
        </>
    )
}

export default LoginForm