import React from "react";
import {Context} from "../../../api/store/storeContext.js";

const NotFoundPage = () => {
    const {store} = React.useContext(Context);
    const [loadingTime, setLoadingTime] = React.useState(null);


    React.useEffect(() => {
        // Записываем время начала
        const startTime = Date.now();
        store.checkAuth().then(() => {
            // Вычисляем разницу после завершения checkAuth
            const elapsed = Date.now() - startTime;
            console.log("Время, в течение которого isLoading было true:", elapsed, "мс");
            setLoadingTime(elapsed);
        });
    }, [store]);

    console.log(loadingTime);


    if (store.isLoading) {
        return <div>

        </div>;
    }

    return (
        <h1>
            404 Not Found
        </h1>
    );
};

export default NotFoundPage;