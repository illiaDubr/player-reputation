import React from "react";
import {Context} from "../../../api/store/storeContext.js";

const NotFoundPage = () => {
    const {store} = React.useContext(Context);



    React.useEffect(() => {
        store.checkAuth()
            .then(() => {
                console.log(store.isAuth)
            })
    }, [store]);

    if (store.isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <h1>
            404 Not Found
        </h1>
    );
};

export default NotFoundPage;