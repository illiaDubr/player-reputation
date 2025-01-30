import React from 'react';
import {Modal, useModal} from "../../../components/Modal.jsx";
import {useNavigate} from "react-router-dom";
import {ACCOUNT_ROUTE} from "../../../../../utils/const.js";
import IconSvg from "../../../components/IconSvg.jsx";
import {Context} from "../../../../../api/store/storeContext.js";
import { useForm } from 'react-hook-form';
import {schemaAuth} from "./schema.js";
import {yupResolver} from "@hookform/resolvers/yup";
import Login from "./Login.jsx";
import TwoFA from "./TwoFA.jsx";

function Auth() {
    const {store} = React.useContext(Context);
    const navigate = useNavigate();
    const {openModal, closeAllModals} = useModal();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(schemaAuth),
        mode: 'onChange',
    });

    const openFirstModal = () => {
        openModal("FirstModal");
    }
    const openLoginModal = () => {
        openModal("Login");
    }

    const openTwoFAModal = () => {
        openModal("TwoFAModal");
    }

    const openRole = () => {
        openModal("role");
    }

    const submitForm = async (data) => {
        try {
            await store.registration(data.email, data.password, data.confirmPassword);
        } catch (error) {
            reset();
        } finally {
            navigate(ACCOUNT_ROUTE);
        }
    }

    return (
        <>
            <button type="button" onClick={openFirstModal} className="temporary">
                Регистрация
            </button>

            <Modal modalName="FirstModal">
                <div className="modal__title">
                    Регистрация
                    <button className="modal__btn" type="button" onClick={closeAllModals}>
                        <IconSvg width="36" height="36" id="close-menu"/>
                    </button>
                </div>
                <form method="POST" className="modal__body" onSubmit={handleSubmit(submitForm)} autoComplete="OFF">
                    <div className="modal__input-box">
                        <label htmlFor="email" className="label">
                            Почта
                        </label>
                        <input
                            {...register('email')}
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            className={`input ${errors.email ? 'input__error' : ''}`}
                            id="email"
                            type="email"
                            placeholder="Введите почту"
                        />
                        <p className="input__error-text">{errors.email?.message}</p>
                    </div>
                    <div className="modal__input-box">
                        <label htmlFor="password" className="label">
                            Пароль
                        </label>
                        <input
                            {...register('password')}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            className={`input ${errors.password ? 'input__error' : ''}`}
                            id="password"
                            type="password"
                            placeholder="Пароль"
                        />
                        <p className="input__error-text">{errors.password?.message}</p>
                    </div>
                    <div className="modal__input-box">
                        <label htmlFor="confirmPassword" className="label">
                            Повторите пароль
                        </label>
                        <input
                            {...register('confirmPassword')}
                            onChange={e => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            className={`input ${errors.confirmPassword ? 'input__error' : ''}`}
                            id="confirmPassword"
                            type="password"
                            placeholder="Пароль"
                        />
                        <p className="input__error-text">{errors.confirmPassword?.message}</p>
                    </div>
                    <p className="modal__text">
                        У вас уже есть аккаунт? <button className="modal__text" type="button" onClick={openLoginModal}>Войти</button>
                    </p>
                    <button className="modal__form-btn" type="submit">
                        {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                </form>
            </Modal>
            <Modal modalName="role">
                <div className="modal__title">
                    Выберите как вы будете использовать
                    сервис Player Reputation
                </div>
            </Modal>
            <Login />
            <TwoFA />
        </>
    )
}

export default Auth