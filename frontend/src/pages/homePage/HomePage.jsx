import React from "react";
import {Helmet} from "react-helmet-async";
import "../../style/HomePage/main/homePage.scss";
import "../../style/HomePage/footer/footer.scss"
import {observer} from "mobx-react-lite";
import Title from "../../components/HomePage/main/titleSection/Title.jsx";
import EducationVideo from "../../components/HomePage/main/titleSection/EducationVideo.jsx";
import Switcher from "../../components/HomePage/main/components/Switcher.jsx";
import {RoleContext} from "../../components/HomePage/main/components/RoleContext.jsx";
import RoleSwitcher from "../../components/HomePage/main/components/RoleSwitcher.jsx";
import Auth from "../../components/HomePage/main/auth/Auth.jsx";
import HomeHeader from "../../components/HomePage/header/HomeHeader.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/HomePage/footer/Footer.jsx";
import ContactForm from "../../components/HomePage/main/subscriptionSection/form/ContactForm.jsx";
import Subscribe from "../../components/HomePage/main/subscriptionSection/subscription/Subscription.jsx";

const HomePage = observer(() => {
    const { selectedRole, setSelectedRole } = React.useContext(RoleContext);
    const navigate = useNavigate();
    const { hash } = useLocation();

    const [userData, setUserData] = React.useState({
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    React.useEffect(() => {
        if (hash) {
            const element = document.querySelector(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });

                navigate(window.location.pathname, { replace: true });
            }
        }
    }, [hash, navigate]);

    return (
        <>
            <Helmet>
                <title>
                    Player`s Reputation
                </title>
            </Helmet>
            <HomeHeader />
            <main className={`main ${selectedRole}`}>
                <section className="title__section">
                    <Title />
                    <EducationVideo />
                </section>
                <section className="role__section">
                    <RoleSwitcher player={true}>
                        <Switcher text={true}/>
                    </RoleSwitcher>
                    {/*<RoleSwitcher backer={true}>
                        <Switcher text={true}/>
                    </RoleSwitcher>*/}
                </section>
                <section className="subscription__section" id="subscription_section">
                    <div className="subscription__content-wrap">
                        <h2>
                            Как мы работаем, условия
                        </h2>
                        <Subscribe/>
                    </div>
                    <ContactForm/>
                </section>
                <Auth userData={userData} setUserData={setUserData}/>
            </main>
            <Footer selectedRole={selectedRole} />
        </>
    )
})

export default HomePage;