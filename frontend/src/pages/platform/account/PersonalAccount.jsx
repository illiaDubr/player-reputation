import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import "../../../style/components/main/section/account/account.scss";
import Main from "../../../components/main/Main.jsx";
import {SEARCH_ROUTE} from "../../../utils/const.js";
import {Modal, useModal} from "../../../components/main/components/Modal.jsx";
import IconSvg from "../../../components/main/components/IconSvg.jsx";
import AccountForm from "../../../components/main/section/account/AccountForm.jsx";

function PersonalAccount() {
    const {openModal} = useModal();

    const openReputationModal = () => {
        openModal("reputation");
    }

    return (
        <>
            <Helmet>
                <title>
                    Личный кабинет
                </title>
            </Helmet>
            <Main secClassName="account__wrap" secID="account">
                <div className="account__nav">
                    <Link className="account__link" to={SEARCH_ROUTE}>
                        Осуществить поиск по базе
                    </Link>
                    <button className="account__link" type="button" onClick={openReputationModal}>
                        Внести информацию репутации своего игрока
                    </button>
                    <div className="grid__item verification">
                        <div className="">
                            <IconSvg width={20} height={20} id="red_notification"/>
                        </div>
                    </div>
                </div>
                <Modal modalName="reputation">
                    <div className="modal__title">
                        Внесение информации по игроку
                    </div>
                    <AccountForm slideType="addPlayer"/>
                </Modal>
            </Main>
        </>
    )
}

export default PersonalAccount;