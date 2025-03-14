import React from "react";
import { Context } from "../../../api/store/storeContext.js";
import { useNavigate } from "react-router-dom";
import IconSvg from "./IconSvg.jsx";
import {HOMEPAGE_ROUTE} from "../../../utils/const.js";

const LogoutBtn = ( { className } ) => {
    const {store} = React.useContext(Context);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await store.logout();
        navigate(HOMEPAGE_ROUTE);
    };

    return (
        <button className={className || undefined} onClick={handleLogout}>
            <IconSvg width={20} height={20} id="logout"/>
        </button>
    )
}

export default LogoutBtn