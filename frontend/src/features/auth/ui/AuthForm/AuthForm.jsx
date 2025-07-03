import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schemaAuth} from "@features/auth/model/authSchema.js";
import Input from "@shared/ui/Input/index.js";
import styles from "../AuthFormBase.module.scss"
import {useStore} from "@app/providers";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@shared/config/routes.js";

const AuthForm = () => {
    const { store } = useStore();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(schemaAuth),
        mode: 'onChange',
    });

    const onSubmit = async (data) => {
        try {
            const registrationData = {
                ...data,
                role: "backer",
                approved: "no",
            };
            await store.registration(registrationData);
            navigate(ROUTES.PLATFORM.MAIN_PAGE);
        } catch (error) {
            const serverErrors = error?.response?.data?.errors;
            if (serverErrors) {
                Object.entries(serverErrors).forEach(([field]) => {
                    setError(field, {
                        type: "server",
                        message: "Эта почта уже зарегистрирована",
                    });
                });
            }
        }
    }

    return (
        <>
            <div className={`${styles[`auth__title`]}`}>
                Регистрация
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
                <Input
                    label="Повторите пароль"
                    type="password"
                    placeholder="Повторите пароль"
                    {...register("password_confirmation")}
                    error={errors.password_confirmation}
                />
                <button className={`${styles[`auth__form-btn`]}`} type="submit">
                    {isSubmitting ? 'Загрузка...' : 'Регистрация'}
                </button>
            </form>
        </>
    )
}

export default AuthForm