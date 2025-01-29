import {Modal, useModal} from "../../../components/Modal.jsx";
import IconSvg from "../../../components/IconSvg.jsx";

const TwoFA = () => {
    const {closeAllModals} = useModal();

    return (
        <Modal modalName="TwoFAModal">
            <div className="modal__title">
                Подтвердите свою почту
                <button className="modal__btn" type="button" onClick={closeAllModals}>
                    <IconSvg width="36" height="36" id="close-menu"/>
                </button>
            </div>
            <div className="modal__body" >
                <p className="modal__text">
                    На ваш электронный адрес был отправлен код. Введите его, чтобы продолжить пользоваться платформой
                </p>
            </div>
        </Modal>
    )
}

export default TwoFA