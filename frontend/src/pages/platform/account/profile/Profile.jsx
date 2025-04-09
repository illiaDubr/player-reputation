import React from "react";
import {Helmet} from "react-helmet-async";
import Main from "../../../../components/main/Main.jsx";
import {ProfileData} from "../../../../utils/Profile.js";
import "../../../../style/platform/account/account.scss"
import IconSvg from "../../../../components/platform/components/IconSvg.jsx";
import {Context} from "../../../../api/store/storeContext.js";

const Profile = () => {
    const {store} = React.useContext(Context);
    //const [profile, setProfile] = React.useState([]);
    const profile = store.user?.backer;

    console.log(profile);


    return (
        <>
            <Helmet>
                <title>
                    Профиль
                </title>
            </Helmet>
            <Main secClassName="profile__wrap" secID="profile">
                <div className="profile__box">
                    {profile.map((item, index) => (
                        <>
                            <div className="profile" key={index}>
                                <div className="profile__item profile__left">
                                    <div className="profile__top">
                                        <IconSvg width={48} height={48} variant="funds" id={item.fund_for_search} />
                                    </div>
                                    <div className="profile__item">
                                        <div className="profile__title">
                                            Описание фонда:
                                        </div>
                                        <div className="profile__text">
                                            {item.fundDescr}
                                        </div>
                                    </div>
                                    <div className="profile__item">
                                        <div className="profile__title">
                                            ФИО главного контактного лица:
                                        </div>
                                        <div className="profile__text">
                                            {item.contact_name}
                                        </div>
                                    </div>
                                    <div className="profile__item">
                                        <div className="profile__title">
                                           Дискорд для связи:
                                        </div>
                                        <div className="profile__text">
                                            {item.discord}
                                        </div>
                                    </div>
                                </div>
                                <div className="profile__item profile__right">
                                </div>
                            </div>
                            <button type="button">
                                Изменить
                            </button>
                        </>
                    ))}
                </div>
            </Main>
        </>
    )
}

export default Profile;