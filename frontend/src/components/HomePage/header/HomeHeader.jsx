import React from 'react';
import "../../../style/HomePage/header/homeHeader.scss";
import {Link} from "react-router-dom";
import {HOMEPAGE_ROUTE} from "../../../utils/const.js";
import IconSvg from "../../platform/components/IconSvg.jsx";
import AuthBtn from "../main/auth/AuthBtn.jsx";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Resize from "../../platform/components/Resize.jsx";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    {to: "#role__section", label: "Выбрать роль"},
    {to: "#tasks__section", label: "Задачи PR"},
    {to: "#subscription_section", label: "Тарифы"}
];

function NavHeader() {
    return (
        <>
            <li className="home__nav-item">
                <ul className="home__nav-list">
                    {navLinks.map(({to, label}, index) => (
                        <li key={index} className="home__nav-item">
                            <Link to={to} className="home__nav-link">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
            <li className="home__nav-item">
                <AuthBtn/>
            </li>
        </>
    )
}

const HomeHeader = () => {
    const headerRef = React.useRef(null);
    const [isBtnOpen, setIsBtnOpen] = React.useState(null);

    const toggleBtn = () => setIsBtnOpen((prev) => !prev);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.to(headerRef.current, {
                backdropFilter: "blur(40px)",
                borderRadius: "1000px",
                border: "1px solid #FFFFFF",
                padding: "24px 36px",
                duration: 0.6,
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "+=150",
                    scrub: true
                }
            });
        }, headerRef);

        return () => ctx.revert();
    }, []);

    return (
        <header ref={headerRef} className={`home__header ${isBtnOpen ? "home__header--open" : ""}`}>
            <nav className="home__nav-wrap" aria-label="Главная навигация">
                <ul className="home__nav">
                    <li className="home__nav-item">
                        <Link to={HOMEPAGE_ROUTE} className="home__nav-link" aria-label="Логотип">
                            <Resize width={880} fallback={
                                <IconSvg width={61} height={36} id="logo"/>
                            }>
                                <IconSvg width={110} height={48} id="logo"/>
                            </Resize>
                        </Link>
                    </li>
                    <Resize width={880} fallback={
                        <button className={`header__btn-burger ${isBtnOpen ? "header__btn-burger--open" : ""}`}
                                type="button" onClick={toggleBtn}>



                            <span className="line top-line"></span>
                            <span className="line bottom-line"></span>


                        </button>
                    }>
                        <NavHeader/>
                    </Resize>
                </ul>
            </nav>
        </header>
    )
}

export default HomeHeader;