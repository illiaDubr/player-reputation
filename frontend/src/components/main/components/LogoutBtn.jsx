import React from "react";
import { Context } from "../../../api/store/storeContext.js";

const LogoutBtn = ( { className } ) => {
    const {store} = React.useContext(Context);

    return (
        <button className={className} onClick={ () => store.logout() }>
            Logout
        </button>
    )
}

export default LogoutBtn