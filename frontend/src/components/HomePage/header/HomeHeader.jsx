import React from 'react';
import "../../../style/HomePage/header/homeHeader.scss";
import {Link} from "react-router-dom";
import {HOMEPAGE_ROUTE} from "../../../utils/const.js";
import IconSvg from "../../platform/components/IconSvg.jsx";
import AuthBtn from "../main/auth/AuthBtn.jsx";
import Resize from "../../platform/components/Resize.jsx";

const navLinks = [
    {to: "#role__section", label: "Выбрать роль"},
    //{to: "#subscription_section", label: "Тарифы"}
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
                <AuthBtn text="Войти" isActive={false} />
            </li>
        </>
    )
}

const HomeHeader = () => {
    const [isBtnOpen, setIsBtnOpen] = React.useState(null);

    const toggleBtn = () => setIsBtnOpen((prev) => !prev);

    return (
        <header className={`home__header ${isBtnOpen ? "home__header--open" : ""}`}>
            <nav className="home__nav-wrap" aria-label="Главная навигация">
                <ul className="home__nav">
                    <li className="home__nav-item">
                        <Link to={HOMEPAGE_ROUTE} className="home__nav-link" aria-label="Логотип">
                            <Resize width={670} fallback={
                                <IconSvg width={61} height={36} id="logo"/>
                            }>
                                <IconSvg width={110} height={48} id="logo"/>
                            </Resize>
                        </Link>
                    </li>
                    <Resize width={670} fallback={
                        null
                    }>
                        <NavHeader/>
                    </Resize>
                </ul>
            </nav>
        </header>
    )
}

export default HomeHeader;

{/*<button className={`header__btn-burger ${isBtnOpen ? "header__btn-burger--open" : ""}`}
                                type="button" onClick={toggleBtn}>
                            <span className="line top-line"></span>
                            <span className="line bottom-line"></span>
                        </button>*/}