import React from "react";
import IconSvg from "../../../components/IconSvg.jsx";
import {Context} from "../../../../../api/store/storeContext.js";

const Report = () => {
    const {store} = React.useContext(Context);

    React.useEffect(() => {
        store.checkAuth().then(() => {
            console.log("Authorized user:", store.user);
        })
    }, [store]);

    return (
        <button className="result__edit" type="button">
            <IconSvg width={16} height={16} id="danger_triangle"/> Репорт метки
        </button>
    )
}

export default Report;