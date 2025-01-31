import React from 'react';
import {Modal, useModal} from "../../../components/Modal.jsx";
import {useNavigate} from "react-router-dom";
import {ACCOUNT_ROUTE} from "../../../../../utils/const.js";
import IconSvg from "../../../components/IconSvg.jsx";
import {Context} from "../../../../../api/store/storeContext.js";
import {useForm} from 'react-hook-form';
import {schemaAuth} from "./schema.js";
import {yupResolver} from "@hookform/resolvers/yup";
import Login from "./Login.jsx";

function Auth() {
    const {store} = React.useContext(Context);
    const navigate = useNavigate();
    const {openModal, closeAllModals} = useModal();


    const [userData, setUserData] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: '', // или массив roles: []
    });

    const {
        register: registerStep1,
        handleSubmit: handleSubmitStep1,
        formState: {errors: errorsStep1, isSubmitting: isSubmittingStep1},
        reset: resetStep1,
    } = useForm({
        resolver: yupResolver(schemaAuth),
        mode: 'onChange',
    });

    const {
        register: registerStep2,
        handleSubmit: handleSubmitStep2,
        formState: {errors: errorsStep2, isSubmitting: isSubmittingStep2},
        reset: resetStep2,
        setError,
    } = useForm({
        mode: 'onChange',
    });

    const openFirstModal = () => {
        openModal("FirstModal");
    };

    const openLoginModal = () => {
        openModal("Login");
    };

    const openRoleModal = () => {
        openModal("role");
    };

    const onSubmitStep1 = (data) => {
        setUserData((prev) => ({
            ...prev,
            email: data.email,
            password: data.password,
        }));

        openRoleModal();

        resetStep1();
    };

    const onSubmitStep2 = async (data) => {
        try {
            await store.registration(
                userData.email,
                userData.password,
                data.confirmPassword,
                userData.role || data.role
            );
        } catch (error) {
            resetStep2();
        } finally {
            navigate(ACCOUNT_ROUTE);
        }
    };

    const handleRoleChange = (newRole) => {
        setUserData((prev) => ({
            ...prev,
            role: newRole,
        }));
    };

    return (
        <>
            <button type="button" onClick={openFirstModal} className="temporary">
                Регистрация (Шаг 1)
            </button>

            <Modal modalName="FirstModal">
                <div className="modal__title">
                    Регистрация
                    <button className="modal__btn" type="button" onClick={closeAllModals}>
                        <IconSvg width="36" height="36" id="close-menu"/>
                    </button>
                </div>
                <form className="modal__body" onSubmit={handleSubmitStep1(onSubmitStep1)} autoComplete="off">
                    <div className="modal__input-box">
                        <label htmlFor="email" className="label">Почта</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Введите почту"
                            className={`input ${errorsStep1.email ? 'input__error' : ''}`}
                            {...registerStep1('email')}
                        />
                        <p className="input__error-text">
                            {errorsStep1.email?.message}
                        </p>
                    </div>
                    <div className="modal__input-box">
                        <label htmlFor="password" className="label">Пароль</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Пароль"
                            className={`input ${errorsStep1.password ? 'input__error' : ''}`}
                            {...registerStep1('password')}
                        />
                        <p className="input__error-text">
                            {errorsStep1.password?.message}
                        </p>
                    </div>
                    <div className="modal__input-box">
                        <label htmlFor="confirmPassword" className="label">
                            Повторите пароль
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Пароль"
                            className={`input ${errorsStep1.confirmPassword ? 'input__error' : ''}`}
                            {...registerStep1('confirmPassword')}
                        />
                        <p className="input__error-text">
                            {errorsStep1.confirmPassword?.message}
                        </p>
                    </div>
                    <p className="modal__text">
                        Уже есть аккаунт?{' '}
                        <button className="modal__text" type="button" onClick={openLoginModal}>
                            Войти
                        </button>
                    </p>

                    <button className="modal__form-btn" type="submit">
                        {isSubmittingStep1 ? 'Далее...' : 'Далее'}
                    </button>
                </form>
            </Modal>
            <Modal modalName="role">
                <div className="modal__title">
                    Выберите как вы будете использовать
                    сервис Player Reputation
                </div>
                <form
                    className="modal__body modal-custom"
                    onSubmit={handleSubmitStep2(onSubmitStep2)}
                    autoComplete="off"
                >
                    {/* Чекбоксы ролей (пример простой логики) */}
                    <div className="modal__checkbox-wrap">
                        <label className="modal__checkbox-box">
                            <div className="modal__checkbox-photo"></div>
                            <p className="modal__checkbox-title">Как игрок</p>
                            <p className="modal__checkbox-text">
                                Для просмотра своей репутации, подбора бэкера и анализа базы
                            </p>
                            <input
                                className="modal__checkbox"
                                type="radio"
                                name="role"
                                onChange={() => handleRoleChange('player')}
                                checked={userData.role === 'player'}
                            />
                        </label>

                        <label className="modal__checkbox-box">
                            <div className="modal__checkbox-photo"></div>
                            <p className="modal__checkbox-title">Как бэкер</p>
                            <p className="modal__checkbox-text">
                                Для анализа репутации игроков, прогнозов и добавления данных
                            </p>
                            <input
                                className="modal__checkbox"
                                type="radio"
                                name="role"
                                onChange={() => handleRoleChange('backer')}
                                checked={userData.role === 'backer'}
                            />
                        </label>
                    </div>
                    <p className="modal__text">
                        Если вы хотите использовать сервис Player Reputation как игрок и бэкер, создайте отдельные аккаунты и выберите интересующие вас роли
                    </p>
                    <button className="modal__form-btn" type="submit">
                        {isSubmittingStep2 ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                </form>
            </Modal>


            <Login/>
        </>
    )
}

export default Auth