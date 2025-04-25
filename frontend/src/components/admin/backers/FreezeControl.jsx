import React from "react";
import {Context} from "../../../api/store/storeContext.js";

const FreezeControl = ({backerId, setCorrectRequestData}) => {
    const {store} = React.useContext(Context);

    const handleSubmit = (e) => {
        e.preventDefault();

        const backerData = {
            id: backerId,
            approved: "under_review",
        };

        store.approvedBacker(backerData)
            .then(() => {
                setCorrectRequestData(backerData, true)
            })
    }

    return (
        <form className="record__form" onSubmit={handleSubmit}>
            <button type="submit" className="record__btn">
                Заморозить аккаунт
            </button>
        </form>
    )
}

export default FreezeControl;