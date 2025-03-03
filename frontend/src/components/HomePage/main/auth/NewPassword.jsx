import {Modal, useModal} from "../../../components/Modal.jsx";
import IconSvg from "../../../components/IconSvg.jsx";

function NewPassword() {
    const {goBack, closeAllModals} = useModal();

    return (
        <>
            <Modal modalName="NewPassword">
                <div className="modal__title">
                    Сбросьте свой пароль
                    <button className="modal__btn" type="button" onClick={closeAllModals}>
                        <IconSvg width="36" height="36" id="close-menu"/>
                    </button>
                </div>
                <form method="POST" className="modal__body" autoComplete="off">
                    <p className="modal__text modal__text-left">
                        Введите свой адрес электронной почты, и мы вышлем вам ссылку для сброса пароля.
                    </p>
                    <div className="modal__input-box">
                        <label htmlFor="email" className="label">
                            Почта
                        </label>
                        <input
                            className="input"
                            id="email" type="email" placeholder="Введите почту"/>
                    </div>
                    <div className="modal__input-box">
                        <label htmlFor="password" className="label">
                            Пароль
                        </label>
                        <input className="input" id="password" type="password" placeholder="Пароль"/>
                    </div>
                    <button className="modal__form-btn" type="submit">
                        Сбросить пароль
                    </button>
                    <button className="modal__text" type="button" onClick={goBack}>
                        Назад
                    </button>
                </form>
            </Modal>
        </>
    )
}

export default NewPassword