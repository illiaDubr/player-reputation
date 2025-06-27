import React from 'react';
import styles from "./AuthModal.module.scss";
import Modal from "@shared/ui/Modal";
import {clsx} from "clsx";
import Resize from "@shared/ui/Resize";
import IconSvg from "@shared/ui/IconSvg/index.js";
import LoginForm from "@features/auth/ui/LoginForm";
import AuthForm from "@features/auth/ui/AuthForm";

const AuthModal = () => {
    const [isActive, setIsActive] = React.useState(false);

    return (
        <Modal name="Auth" contentClass="modal__auth">
            <div className={`${styles[`auth__wrap`]} ${isActive ? `${styles[`active`]}` : ""}`}>
                <div className={clsx(styles[`form__box`], styles[`login`])}>
                    <LoginForm />
                </div>
                <div className={clsx(styles[`form__box`], styles[`register`])}>
                    <AuthForm />
                </div>
                <div className={`${styles[`auth__toggle-wrap`]}`}>
                    <div className={clsx(styles[`auth__toggle`], styles[`auth__toggle-left`])}>
                        <Resize width={651} fallback={null}>
                            <IconSvg width={110} height={48} id="logo"/>
                        </Resize>
                        <div className={`${styles[`auth__title`]}`}>
                            Добро пожаловать!
                        </div>
                        <p className={`${styles[`auth__text`]}`}>
                            У вас нет учетной записи?
                        </p>
                        <button className={`${styles[`auth__btn`]}`} type="button" onClick={() => setIsActive(true)}>
                            Регистрация
                        </button>
                    </div>
                    <div className={clsx(styles[`auth__toggle`], styles[`auth__toggle-right`])}>
                        <Resize width={651} fallback={null}>
                            <IconSvg width={110} height={48} id="logo"/>
                        </Resize>
                        <div className={`${styles[`auth__title`]}`}>
                            Здравствуйте,<br/> добро пожаловать!
                        </div>
                        <p className={`${styles[`auth__text`]}`}>
                            У вас уже есть аккаунт?
                        </p>
                        <button className={`${styles[`auth__btn`]}`} type="button" onClick={() => setIsActive(false)}>
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AuthModal;