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
                                            <label className="active" htmlFor="">
                                                {profile.fundDescr || "Описание не указано"}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder={profile.fundDescr || "Введите описание"}
                                            />
                                            <button type="button" className={`profile__edit-btn ${activeBtn ? "profile__edit-btn--active" : ""}`}>
                                                <IconSvg width={16} height={16} id="pen"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="profile__field">
                                        <div className="profile__title">
                                            ФИО главного контактного лица:
                                        </div>
                                        <div className="profile__info">
                                            {profile.contact_name || "Контактное лицо не указано"}
                                        </div>
                                    </div>
                                    <div className="profile__field">
                                        <div className="profile__title">
                                            Дискорд для связи:
                                        </div>
                                        <div className="profile__info">
                                            {profile.discord || "Discord не указан"}
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