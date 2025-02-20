import React from 'react';
import {Modal, useModal} from "../../../components/Modal.jsx";
import {useNavigate} from "react-router-dom";
import {ACCOUNT_ROUTE} from "../../../../../utils/const.js";
import {Context} from "../../../../../api/store/storeContext.js";
import {useForm} from 'react-hook-form';
import {schemaAuth} from "./schema.js";
import {yupResolver} from "@hookform/resolvers/yup";
import Login from "./Login.jsx";
import Images from "../../../../../assets/image/image.js";

function Auth() {
    const {store} = React.useContext(Context);
    const navigate = useNavigate();
    const {openModal} = useModal();
    const [isActive, setIsActive] = React.useState(false);


    const [userData, setUserData] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
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

    const openRoleModal = () => {
        openModal("role");
    };

    const onSubmitStep1 = (data) => {
        console.log("Данные для первого шага (Step 1):", data); // Выводим данные в консоль

        setUserData((prev) => ({
            ...prev,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        }));
        openRoleModal();
        resetStep1();
    };

    const onSubmitStep2 = async (data) => {
        const requestData = {
            email: userData.email,
            password: userData.password,
            confirmPassword: userData.confirmPassword,
            role: userData.role || data.role,
        };

        console.log("Данные, отправляемые на сервер:", requestData);

        try {
            await store.registration(
                requestData.email,
                requestData.password,
                requestData.confirmPassword,
                requestData.role
            );
        } catch (error) {
            console.error("Ошибка регистрации:", error);
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
                <div className={`auth__wrap ${isActive ? "active" : ""}`}>
                    <div className="form__box login">
                        <Login />
                    </div>
                    <div className="form__box register">
                        <div className="auth__title">
                            Регистрация
                        </div>
                        <form className="auth__form" onSubmit={handleSubmitStep1(onSubmitStep1)} autoComplete="off">
                            <div className="auth__input-box">
                                <label htmlFor="email" className="label">Почта</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Введите почту"
                                    className={`input ${errorsStep1.email ? 'input__error' : ''}`}
                                    {...registerStep1('email')}
                                />
                                <p className={`auth__input-error ${errorsStep1.email ? "active" : ""}`}>
                                    {errorsStep1.email?.message}
                                </p>
                            </div>
                            <div className="auth__input-box">
                                <label htmlFor="password" className="label">Пароль</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Пароль"
                                    className={`input ${errorsStep1.password ? 'input__error' : ''}`}
                                    {...registerStep1('password')}
                                />
                                <p className={`auth__input-error ${errorsStep1.password ? "active" : ""}`}>
                                    {errorsStep1.password?.message}
                                </p>
                            </div>
                            <div className="auth__input-box">
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
                                <p className={`auth__input-error ${errorsStep1.confirmPassword ? "active" : ""}`}>
                                    {errorsStep1.confirmPassword?.message}
                                </p>
                            </div>
                            <button className="auth__form-btn" type="submit">
                                {isSubmittingStep1 ? 'Далее...' : 'Далее'}
                            </button>
                        </form>
                    </div>
                    <div className="auth__toggle-wrap">
                        <div className="auth__toggle auth__toggle-left">
                            <div>
                                Добро пожаловать!
                            </div>
                            <p>
                                У вас нет учетной записи?
                            </p>
                            <button className="auth__btn" type="button" onClick={() => setIsActive(true)}>
                                Register
                            </button>
                        </div>
                        <div className="auth__toggle auth__toggle-right">
                            <div>
                                Здравствуйте, добро пожаловать!
                            </div>
                            <p>
                                У вас уже есть аккаунт?
                            </p>
                            <button className="auth__btn" type="button" onClick={() => setIsActive(false)}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal modalName="role">
                <div className="modal__title-role">
                    Выберите как вы будете использовать<br/>
                    сервис Player Reputation
                </div>
                <form className="modal__body modal-custom" onSubmit={handleSubmitStep2(onSubmitStep2)}
                      autoComplete="off"
                >
                    <div className="modal__checkbox-wrap">
                        <label className="modal__checkbox-box">
                            <div className="modal__checkbox-photo">
                                <img src={Images["role-1"]} alt="" className=""/>
                            </div>
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
                            <div className="modal__checkbox-photo">
                                <img src={Images["role-2"]} alt="" className=""/>
                            </div>
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
        </>
    )
}

export default Auth