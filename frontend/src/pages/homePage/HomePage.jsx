import React from "react";
import {Helmet} from "react-helmet-async";
import "../../style/helpers/fonts.scss";
import "../../style/components/main/section/HomePage/homePage.scss";
import { Context } from "../../api/store/storeContext.js";
import LogoutBtn from "../../components/platform/components/LogoutBtn.jsx";
import Auth from "../../components/platform/section/homePage/auth/Auth.jsx";
import {observer} from "mobx-react-lite";
import HomeHeader from "../../components/HomePage/header/HomeHeader.jsx";


const HomePage = observer(() => {
    const {store} = React.useContext(Context);

    React.useEffect(() => {
        store.checkAuth();
    }, []);

    return (
        <>
            <Helmet>
                <title>
                    Player`s Reputation
                </title>
            </Helmet>
            <HomeHeader />
            <main className="main">
                <section className="">
                </section>
            </main>
        </>
    )
})

export default HomePage;