import React from 'react';
import {useForm} from 'react-hook-form';
import {schemaLogin} from "./schema.js";
import {useNavigate} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {Context} from "../../../../api/store/storeContext.js";
import {useModal} from "../../../platform/components/Modal.jsx";
import {ADMIN_ROUTE, ACCOUNT_ROUTE, HOMEPAGE_ROUTE} from "../../../../utils/const.js";

const Login = () => {
    const {store} = React.useContext(Context);
    const {openModal} = useModal();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(schemaLogin),
        mode: 'onChange',
    });

    const submitForm = async (data) => {
        try {
            await store.login(data);
            await store.checkAuth();

            const roleToRoute = {
                admin: ADMIN_ROUTE,
                backer: ACCOUNT_ROUTE,
            };

            const route = roleToRoute[store.user.role] || HOMEPAGE_ROUTE;
            navigate(route);
        } catch (error) {
            reset();
            openModal("Auth");
        }
    };

    return (
        <>
            <div className="auth__title">Вход</div>
            <form
                method="POST"
                className="auth__form"
                autoComplete="off"
                onSubmit={handleSubmit(submitForm)}
            >
                <div className="auth__input-box">
                    <label htmlFor="loginEmail" className="label">
                        Почта
                    </label>
                    <input
                        {...register('email')}
                        className={`input ${errors.email ? 'input__error' : ''}`}
                        id="loginEmail"
                        type="email"
                        placeholder="Введите почту"
                    />
                    {errors.email && (
                        <p className="auth__input-error active">{errors.email.message}</p>
                    )}
                </div>
                <div className="auth__input-box">
                    <label htmlFor="loginPassword" className="label">
                        Пароль
                    </label>
                    <input
                        {...register('password')}
                        className={`input ${errors.password ? 'input__error' : ''}`}
                        id="loginPassword"
                        type="password"
                        placeholder="Пароль"
                    />
                    {errors.password && (
                        <p className="auth__input-error active">{errors.password.message}</p>
                    )}
                </div>
                <button className="auth__form-btn" type="submit">
                    {isSubmitting ? 'Загрузка...' : 'Войти'}
                </button>
            </form>
        </>
    );
};

export default Login;