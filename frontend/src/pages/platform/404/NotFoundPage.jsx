import React from "react";
import {Context} from "../../../api/store/storeContext.js";
import IconSvg from "../../../components/platform/components/IconSvg.jsx";

const NotFoundPage = () => {
    const {store} = React.useContext(Context);
    const [loadingTime, setLoadingTime] = React.useState(null);


    React.useEffect(() => {
        // Записываем время начала
        const startTime = Date.now();
        store.checkAuth().then(() => {
            const elapsed = Date.now() - startTime;
            console.log("Время, в течение которого isLoading было true:", elapsed, "мс");
            setLoadingTime(elapsed);
        });
    }, [store]);


    if (store.isLoading) {
        const style = loadingTime ? { animationDuration: `${loadingTime}ms` } : {};
        return <div className="loading__wrap">
            <div className="loading__box" style={style}>
                <IconSvg width={590} height={340} id="loading__logo" />
            </div>
        </div>;
    }

    return (
        <h1>
            404 Not Found
        </h1>
    );
};

export default NotFoundPage;