import React from 'react';
import "../../../style/HomePage/header/homeHeader.scss";
import {Link} from "react-router-dom";
import {HOMEPAGE_ROUTE} from "../../../utils/const.js";
import Auth from "../main/auth/Auth.jsx";
import IconSvg from "../../platform/components/IconSvg.jsx";

const navLinks = [
    { to: "#role__section", label: "Выбрать роль" },
    { to: "#tasks__section", label: "Задачи PR" },
    { to: "#subscription_section", label: "Тарифы" }
];

const HomeHeader = () => {
    return (
        <header className="home__header">
            <nav className="home__nav-wrap" aria-label="Главная навигация">
                <ul className="home__nav">
                    <li className="home__nav-item">
                        <Link to={HOMEPAGE_ROUTE} className="home__nav-link" aria-label="Логотип">
                            <IconSvg width={110} height={48} id="logo" />
                        </Link>
                    </li>
                    <li className="home__nav-item">
                        <ul className="home__nav-list">
                            {navLinks.map(({ to, label }, index) => (
                                <li key={index} className="home__nav-item">
                                    <Link to={to} className="home__nav-link">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="home__nav-item">

                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HomeHeader;