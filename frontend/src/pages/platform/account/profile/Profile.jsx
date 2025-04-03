import React from "react";
import {Helmet} from "react-helmet-async";
import Main from "../../../../components/main/Main.jsx";

const Profile = () => {
    return (
        <>
            <Helmet>
                <title>
                    Профиль
                </title>
            </Helmet>
            <Main secClassName="profile__wrap" secID="profile">
            </Main>
        </>
    )
}

export default Profile;