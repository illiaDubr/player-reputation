import React from "react";
import {Helmet} from "react-helmet-async";
import Main from "../../../../components/main/Main.jsx";
import {ProfileData} from "../../../../utils/Profile.js";
import "../../../../style/platform/account/account.scss"
import IconSvg from "../../../../components/platform/components/IconSvg.jsx";

const Profile = () => {
    return (
        <>
            <Helmet>
                <title>
                    Профиль
                </title>
            </Helmet>
            <Main secClassName="profile__wrap" secID="profile">
                <div className="profile__box">
                    {ProfileData.map((item, index) => (
                        <>
                            <div className="profile" key={index}>
                                <div className="profile__item profile__left">
                                    <div className="profile__top">
                                        <IconSvg width={32} height={32} fill={item.icon} />
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