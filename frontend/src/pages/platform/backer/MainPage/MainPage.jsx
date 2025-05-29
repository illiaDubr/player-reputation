import React from "react";
import {Helmet} from "react-helmet-async";
import {ROUTES} from "@shared/config/routes.js";
import AccountAction from "@pages/platform/backer/MainPage/ui/AccountAction";
import styles from "./MainPage.module.scss";
import img1 from "./assets/image/file-explorer-search.webp"
import img2 from "./assets/image/data-extraction-visualization.webp"
import Modal from "@shared/ui/Modal";
import {useModal, useStore} from "@app/providers";
import MainPageModalWrapper from "@pages/platform/backer/MainPage/ui/MainPageModalWrapper";
import ShowIf from "@shared/ui/ShowIf/index.js";
import IconSvg from "@shared/ui/IconSvg/index.js";
import Button from "@shared/ui/SubmitButton/index.js";


const MainPage = () => {
    const {store} = useStore();
    const {openModal} = useModal();
    const approvalStatus = store.user?.backer?.approved;
    const [disabled, setDisabled] = React.useState(true);
    const fund_name = store.user?.backer?.fund_for_search;
    const backerId = store.user?.backer?.backer_id;

    const actions = React.useMemo(() => ({
        null: () => {
            openModal('MainPageModal', {origin: "setup", title: "Заполни полную авторизацию бэкера"});
            setDisabled(true);
        },
        "under_review": () => {
            setDisabled(true);
        },
        "no": () => {
            setDisabled(true);
        },
        "yes": () => {
            setDisabled(false);
        },
    }), [openModal])

    React.useEffect(() => {
        actions?.[approvalStatus]?.();
    }, [approvalStatus, actions]);

    return (
        <>
            <Helmet>
                <title>
                    Личный кабинет
                </title>
            </Helmet>
            <div className={`${styles[`main-page__quick-actions`]}`}>
                <AccountAction
                    title="Осуществить поиск по базе"
                    to={ROUTES.PLATFORM.SEARCH}
                    imgDecor={img1}
                    disabled={disabled}
                />
                <AccountAction
                    title="Внести запись об игроке"
                    imgDecor={img2}
                    onClick={() => openModal('MainPageModal', {origin: "create", title: "Внесение информации по игроку"})}
                    disabled={disabled}
                />
            </div>

            <ShowIf value={approvalStatus} hideWhen="yes">
                <div className={`${styles.verification}`}>
                    <ShowIf value={approvalStatus} hideWhen={[null, "no"]}>
                        <div className={`${styles[`verification__title`]}`}>
                            <div style={{width: 20, height: 20}}>
                                <IconSvg width={20} height={20} id="green_notification"/>
                            </div>
                            <p>
                                Ваша заявка на верификацию на рассмотрении. Мы примем ее в течение 1 дня
                            </p>
                        </div>
                    </ShowIf>
                    <ShowIf value={approvalStatus} hideWhen={["under_review", "no"]}>
                        <div className={`${styles[`verification__title`]}`}>
                            <div style={{width: 20, height: 20}}>
                                <IconSvg width={20} height={20} id="red_notification"/>
                            </div>
                            <p>
                                Чтобы пользоваться платформой Player Reputation, пройдите верификацию
                                бэкера
                            </p>
                        </div>
                        <Button type="button" maxWidth={371}
                                onClick={() => openModal('MainPageModal', {origin: "setup", title: "Заполни полную авторизацию бэкера"})}>
                            Пройти верификацию
                        </Button>
                    </ShowIf>
                    <ShowIf value={approvalStatus} hideWhen={["under_review", null]}>
                        <div className={`${styles[`verification__title`]}`}>
                            <div style={{width: 20, height: 20}}>
                                <IconSvg width={20} height={20} id="red_notification"/>
                            </div>
                            <p>
                                Ваша запрос на верификацию был отклонен. Обратитесь к администратору
                                Player Reputation, чтобы получить больше информации.
                            </p>
                        </div>
                    </ShowIf>
                </div>
            </ShowIf>

            <Modal name="MainPageModal" contentClass="modal__slides">
                {(modal) => <MainPageModalWrapper origin={modal.params?.origin} fund_name={fund_name} backerId={backerId}/>}
            </Modal>
        </>
    )
}

export default MainPage;