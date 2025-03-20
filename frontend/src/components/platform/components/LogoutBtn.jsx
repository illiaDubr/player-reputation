import React from "react";
import { Context } from "../../../api/store/storeContext.js";
import { animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import IconSvg from "./IconSvg.jsx";
import {HOMEPAGE_ROUTE} from "../../../utils/const.js";

const LogoutBtn = ( { className, iconAnimation, textAnimation } ) => {
    const {store} = React.useContext(Context);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await store.logout();
        navigate(HOMEPAGE_ROUTE);
    };

    return (
        <button className={className || undefined} onClick={handleLogout}>
            <animated.span className="svg-box" style={iconAnimation}>
                <IconSvg width={20} height={20} id="logout" />
            </animated.span>
            <animated.span className="navigation__text" style={textAnimation}>
                Выйти
            </animated.span>
        </button>
    )
}

export default LogoutBtn