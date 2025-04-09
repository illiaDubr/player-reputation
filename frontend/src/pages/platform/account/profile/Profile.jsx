import React from "react";
import {Helmet} from "react-helmet-async";
import Main from "../../../../components/main/Main.jsx";
import "../../../../style/platform/account/account.scss"
import IconSvg from "../../../../components/platform/components/IconSvg.jsx";
import {Context} from "../../../../api/store/storeContext.js";

const Profile = () => {
    const {store} = React.useContext(Context);
    const profile = store.user?.backer;
    const [activeBtn, setActiveBtn] = React.useState(false);
    const [editState, setEditState] = React.useState({
        fundDescr: false,
        contactName: false,
        discord: false,
    });

    const toggleFieldEdit = (fieldName) => {
        setEditState(prev => ({ ...prev, [fieldName]: !prev[fieldName] }));
    };


    const handleToggleEdit = () => {
        setActiveBtn((prev) => !prev);
    };

    console.log(profile);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Helmet>
                <title>
                    Профиль
                </title>
            </Helmet>
            <Main secClassName="profile__wrap" secID="profile">
                <div className="profile__box">
                    {profile && (
                        <>
                            <div className="profile">
                                <form method="PATCH" className="profile__item profile__left" onSubmit={handleSubmit}>
                                    <div className="profile__top">
                                        <IconSvg width={48} height={48} variant="funds" id={profile.fund_for_search}/>
                                    </div>
                                    <div className="profile__field">
                                        <div className="profile__title">
                                            Описание фонда:
                                        </div>
                                        <div className="profile__info">
                                            <div className={`profile__text ${editState.fundDescr ? "" : "active"}`}>
                                                {profile.fundDescr || "Описание не указано"}
                                            </div>
                                            <input
                                                className={`profile__input ${editState.fundDescr ? "active" : ""}`}
                                                type="text"
                                                placeholder="Введите описание"
                                            />
                                            <button type="button"
                                                    onClick={() => toggleFieldEdit("fundDescr")}
                                                    className={`profile__edit-btn ${activeBtn ? "profile__edit-btn--active" : ""}`}>
                                                <IconSvg width={16} height={16} id="pen"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="profile__field">
                                        <div className="profile__title">
                                            ФИО главного контактного лица:
                                        </div>
                                        <div className="profile__info">
                                            <div className={`profile__text ${editState.contactName ? "" : "active"}`}>
                                                {profile.contact_name || "Контактное лицо не указано"}
                                            </div>
                                            <input
                                                className={`profile__input ${editState.contactName ? "active" : ""}`}
                                                type="text"
                                                placeholder="Введите контакт"
                                            />
                                            <button type="button"
                                                    onClick={() => toggleFieldEdit("contactName")}
                                                    className={`profile__edit-btn ${activeBtn ? "profile__edit-btn--active" : ""}`}>
                                                <IconSvg width={16} height={16} id="pen"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="profile__field">
                                        <div className="profile__title">
                                            Дискорд для связи:
                                        </div>
                                        <div className="profile__info">
                                            <div className={`profile__text ${editState.discord ? "" : "active"}`}>
                                                {profile.discord || "Discord не указан"}
                                            </div>
                                            <input
                                                className={`profile__input ${editState.discord ? "active" : ""}`}
                                                type="text"
                                                placeholder="Введите Discord"
                                            />
                                            <button type="button"
                                                    onClick={() => toggleFieldEdit("discord")}
                                                    className={`profile__edit-btn ${activeBtn ? "profile__edit-btn--active" : ""}`}>
                                                <IconSvg width={16} height={16} id="pen"/>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="profile__item profile__right">
                                </div>
                            </div>
                            <button type="button" className="btn" onClick={handleToggleEdit}>
                                Изменить
                            </button>
                        </>
                    )}
                </div>
            </Main>
        </>
    )
}

export default Profile;