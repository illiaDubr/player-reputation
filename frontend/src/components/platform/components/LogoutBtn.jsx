import React from "react";
import { Context } from "../../../api/store/storeContext.js";
import IconSvg from "./IconSvg.jsx";

const LogoutBtn = ( { className } ) => {
    const {store} = React.useContext(Context);

    return (
        <button className={className || undefined} onClick={ () => store.logout() }>
            <IconSvg width={20} height={20} id="logout"/>
        </button>
    )
}

export default LogoutBtn