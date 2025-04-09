import React from "react";
import {Context} from "../../../api/store/storeContext.js";

const NotFoundPage = () => {
    const {store} = React.useContext(Context);


    const loadingStartTimeRef = React.useRef(null);

    React.useEffect(() => {
        if (store.isLoading) {
            // Когда загрузка начинается, сохраняем время
            loadingStartTimeRef.current = Date.now();
        } else {
            // Когда isLoading становится false, проверяем, была ли загрузка
            if (loadingStartTimeRef.current !== null) {
                const elapsedTime = Date.now() - loadingStartTimeRef.current;
                console.log("Время загрузки:", elapsedTime, "мс");
                // Обнуляем ref для следующего измерения
                loadingStartTimeRef.current = null;
            }
        }
    }, [store.isLoading]);


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