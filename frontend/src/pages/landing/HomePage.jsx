import React from "react";
import {Helmet} from "react-helmet-async";
import "../../style/helpers/fonts.scss";
import { Context } from "../../api/store/storeContext.js";
import LogoutBtn from "../../components/main/components/LogoutBtn.jsx";
import Auth from "../../components/main/section/HomePage/auth/Auth.jsx";
import {observer} from "mobx-react-lite";


const HomePage = observer(() => {
    const {store} = React.useContext(Context);

    return (
        <>
            <Helmet>
                <title>
                    Player`s Reputation
                </title>
            </Helmet>
            <div className="block">
                <h1>
                    Player`s Reputation<sub style={{fontSize: "20px", opacity: ".5"}}>beta</sub>
                </h1>
                <Auth/>

                {store.isAuth ? `Пользователь авторизован` : 'АВТОРИЗУЙТЕСЬ'}
                <LogoutBtn className="temporary"/>
            </div>
        </>
    )
})

export default HomePage;