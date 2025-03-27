import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import "../../../style/platform/account/account.scss";
import Main from "../../../components/main/Main.jsx";
import {SEARCH_ROUTE} from "../../../utils/const.js";
import {Modal, useModal} from "../../../components/platform/components/Modal.jsx";
import IconSvg from "../../../components/platform/components/IconSvg.jsx";
import AccountForm from "../../../components/platform/section/account/AccountForm.jsx";
import Images from "../../../assets/image/image.js";
import React from "react";
import {Context} from "../../../api/store/storeContext.js";

function PersonalAccount() {
    const {openModal, closeAllModals} = useModal();
    const {store} = React.useContext(Context);

    const openReputationModal = () => {
        openModal("reputation");
    }

    const openSuccessfullyModal = () => {
        openModal("addedSuccessfully");
    }

    const openAuthorizationModal = () => {
        openModal("authorization");
    }

    const openVerificationModal = () => {
        openModal("verification");
    }

    const [isVisible, setIsVisible] = React.useState(false);

    // Функция для переключения видимости
    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };

    console.log(store.user.backer.approved)

    return (
        <>
            <Helmet>
                <title>
                    Личный кабинет
                </title>
            </Helmet>
            <Main secClassName="account__wrap" secID="account">
                <button type={"button"} onClick={openAuthorizationModal} className="case">
                </button>
                <button type={"button"} onClick={toggleVisibility} className="case" style={{left: "inherit", right: "0"}}>
                </button>
                <div className="account__nav">
                    <Link className="account__link-wrap" to={SEARCH_ROUTE}>
                        <span className="account__link">
                            <span className="account__link-title">
                                Осуществить поиск по базе
                            </span>
                            <img src={Images.big__grid} alt="" className="account__img" />
                            <img src={Images["account_computer-1"]} alt="Account Computer" className="account__img-1" />
                            <IconSvg width={246} height={253} id="Ellipse" />
                        </span>
                    </Link>
                    <button className="account__link-wrap" type="button" onClick={openReputationModal}>
                        <span className="account__link">
                            <span className="account__link-title">
                                Внести информацию репутации своего игрока
                            </span>
                            <img src={Images.big__grid} alt="" className="account__img"/>
                            <img src={Images["account_computer-2"]} alt="Account Computer" className="account__img-2" />
                        </span>
                    </button>
                    {isVisible && (
                        <div className="grid__item verification">
                            <IconSvg width={20} height={20} id="red_notification"/>
                            <p>
                                Ваша заявка на верификацию на рассмотрении. Мы примем ее в течении 1 дня
                            </p>
                        </div>
                    )}
                </div>
                <Modal modalName="reputation">
                    <div className="modal__title">
                        Внесение информации по игроку
                    </div>
                    <AccountForm slideType="addPlayer" modalOpen={openSuccessfullyModal}/>
                </Modal>
                <Modal modalName="addedSuccessfully">
                    <div className="modal__title slide__title-modal">
                        <button className="modal__btn" type="button" onClick={closeAllModals}>
                            <IconSvg width="36" height="36" id="close-menu"/>
                        </button>
                    </div>
                    <div className="modal__body">
                        <p className="modal__text slide__text">
                            Информация об игроке успешно внесена!
                        </p>
                        <button className="modal__form-btn" type="button" onClick={closeAllModals}>
                            Закрыть
                        </button>
                    </div>
                </Modal>



                <Modal modalName="authorization">
                    <div className="modal__title">
                        Заполни полную авторизацию бэкера
                    </div>
                    <AccountForm slideType="addBaker" modalOpen={openVerificationModal}/>
                </Modal>
                <Modal modalName="verification">
                    <div className="modal__title slide__title-modal">
                        <button className="modal__btn" type="button" onClick={closeAllModals}>
                            <IconSvg width="36" height="36" id="close-menu"/>
                        </button>
                    </div>
                    <div className="modal__body">
                        <p className="modal__text slide__text">
                            Ваша заявке отправлена модератору PR время на рассмотрение заявки 1 рабочий день. Информацию о вашем статусе можете просмотреть в личном кабинете
                        </p>
                    </div>
                </Modal>
            </Main>
        </>
    )
}

export default PersonalAccount;