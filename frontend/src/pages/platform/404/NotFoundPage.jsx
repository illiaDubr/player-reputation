import React from "react";
import {Context} from "../../../api/store/storeContext.js";

const NotFoundPage = () => {
    const {store} = React.useContext(Context);

    console.log(store.isLoading)

    return (
        <h1>
            404 Not Found
        </h1>
    );
};

export default NotFoundPage;