import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Modal, useModal} from "../../../components/Modal.jsx";
import {useForm} from 'react-hook-form';
import {schemaLogin} from "./schema.js";
import {yupResolver} from "@hookform/resolvers/yup";
import IconSvg from "../../../components/IconSvg.jsx";
import {Context} from "../../../../../api/store/storeContext.js";
import {ACCOUNT_ROUTE} from "../../../../../utils/const.js";
import NewPassword from "./NewPassword.jsx";

function Login() {
    const navigate = useNavigate();

    const {openModal, closeAllModals} = useModal();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = useState('');
    const {store} = useContext(Context);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(schemaLogin),
        mode: 'onChange',
    });

    const submitForm = async () => {
        await store.login(email, password);
        navigate(ACCOUNT_ROUTE);
        closeAllModals();
        reset();
    }

    const openNewPasswordModal = () => {
        openModal("NewPassword")
    }

    return (
        <>
            <Modal modalName="Login">
                <div className="modal__title">
                    Вход
                    <button className="modal__btn" type="button" onClick={closeAllModals}>
                        <IconSvg width="36" height="36" id="close-menu"/>
                    </button>
                </div>
                <form method="POST" className="modal__body" autoComplete="off" onSubmit={handleSubmit(submitForm)}>
                    <div className="modal__input-box">
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
                        <p className="input__error-text">{errors.email?.message}</p>
                    </div>
                    <div className="modal__input-box">
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
                        <p className="input__error-text">{errors.password?.message}</p>
                    </div>
                    <p className="modal__text">
                        Забыли пароль?{/* <button className="modal__text" type="button" onClick={openNewPasswordModal}>Востановить</button>*/}
                    </p>
                    <button className="modal__form-btn" type="submit">
                        {isSubmitting ? 'Загрузка...' : 'Войти'}
                    </button>
                </form>
            </Modal>
            <NewPassword />
        </>
    )
}

export default Login