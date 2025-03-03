import React from "react";
import {Helmet} from "react-helmet-async";
import "../../style/helpers/fonts.scss";
import "../../style/HomePage/main/homePage.scss";
import {observer} from "mobx-react-lite";
import Title from "../../components/HomePage/main/titleSection/Title.jsx";
import EducationVideo from "../../components/HomePage/main/titleSection/EducationVideo.jsx";


const HomePage = observer(() => {


    return (
        <>
            <Helmet>
                <title>
                    Player`s Reputation
                </title>
            </Helmet>
            <main className="main">
                <section className="title__section">
                    <Title />
                    <EducationVideo />
                </section>
            </main>
        </>
    )
})

export default HomePage;