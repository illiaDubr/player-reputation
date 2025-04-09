import React from "react";
import {Context} from "../../../api/store/storeContext.js";

const NotFoundPage = () => {
    const {store} = React.useContext(Context);

    console.log(store.checkAuth())


    React.useEffect(() => {
        console.log(store.checkAuth())
    });

    return (
        <h1>
            404 Not Found
        </h1>
    );
};

export default NotFoundPage;