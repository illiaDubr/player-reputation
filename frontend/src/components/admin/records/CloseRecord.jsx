import React from "react";
import {Context} from "../../../api/store/storeContext.js";
import RecordItem from "./RecordItem.jsx";

const CloseRecord = () => {
    const {store} = React.useContext(Context);
    const [closeRecord, setCloseRecord] = React.useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        store.getCloseRecord().then((response) => {
            setCloseRecord(response.data.data);
        })
    }

    console.log(closeRecord);

    return (
        <div className="admin__wrap">
            <div className="admin__title">
                Просмотренные записи
            </div>
            <RecordItem data={closeRecord} discussion={false} />
            <form method="GET" onSubmit={handleSubmit}>
                <button type="submit" className="admin__btn">
                    Просмотреть
                </button>
            </form>
        </div>
    )
}

export default CloseRecord;