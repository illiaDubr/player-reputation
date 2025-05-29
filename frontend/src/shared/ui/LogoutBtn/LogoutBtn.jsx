import React from "react";
import {useStore} from "@app/providers/index.jsx";
import styles from "./LogoutBtn.module.scss";
import { animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import {ROUTES} from "@shared/config/routes.js";
import IconSvg from "@shared/ui/IconSvg/index.js";

const LogoutBtn = ({className, iconAnimation, textAnimation }) => {
    const {store} = useStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await store.logout();
        navigate(ROUTES.PORTAL.HOME)
    }

    return (
        <button className={styles[`navigation__list-item__link`]} onClick={handleLogout}>
            <animated.span className={styles[`svg-box`]} style={iconAnimation}>
                <IconSvg width={20} height={20} id="logout" />
            </animated.span>
            <animated.span className={styles[`navigation__text`]} style={textAnimation}>
                Выйти
            </animated.span>
        </button>
    )
}

export default LogoutBtn