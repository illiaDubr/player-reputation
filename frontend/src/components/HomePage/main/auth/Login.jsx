import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {schemaLogin} from "./schema.js";
import {useNavigate} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {Context} from "../../../../api/store/storeContext.js";
import {useModal} from "../../../platform/components/Modal.jsx";
import {ACCOUNT_ROUTE} from "../../../../utils/const.js";

function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(Context);
    const {openModal} = useModal();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        //setError,
        reset,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(schemaLogin),
        mode: 'onChange',
    });

    const submitForm = async (data) => {
        const loginData = {
            email: data.email,
            password: data.password,
        }

        try {
            await store.login(loginData);
            navigate(ACCOUNT_ROUTE);
        } catch (error) {
            reset();
            openModal("Auth");
        }
    };

    return (
        <>
            <div className="auth__title">
                Вход
            </div>
            <form method="POST" className="auth__form" autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                <div className="auth__input-box">
                    <label htmlFor="loginEmail" className="label">
                        Почта
                    </label>
                    <input
                        {...register('email')}
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        className={`input ${errors.email ? 'input__error' : ''}`}
                        id="loginEmail"
                        type="email"
                        placeholder="Введите почту"
                    />
                    <p className={`auth__input-error ${errors.email ? "active" : ""}`}>
                        {errors.email?.message}
                    </p>
                </div>
                <div className="auth__input-box">
                    <label htmlFor="loginPassword" className="label">
                        Пароль
                    </label>
                    <input
                        {...register('password')}
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        className={`input ${errors.password ? 'input__error' : ''}`}
                        id="loginPassword"
                        type="password"
                        placeholder="Пароль"
                    />
                    <p className={`auth__input-error ${errors.password ? "active" : ""}`}>
                        {errors.password?.message}
                    </p>
                </div>
                <button className="auth__form-btn" type="submit">
                    {isSubmitting ? 'Загрузка...' : 'Войти'}
                </button>
            </form>
        </>
    )
}

export default Login