import React from "react";
import {Context} from "../../../api/store/storeContext.js";

const ApprovedBackers = () => {
    const {store} = React.useContext(Context);
    const [approvedBackers, setApprovedBackers] = React.useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();


        store.getApprovedBackers().then((response) => {
            setApprovedBackers(response);
        })
    }

    console.log(approvedBackers);

    return (
        <div className="admin__wrap">
            <div className="admin__title">
                Верифицированные бэкеры
            </div>
            <form method="GET" onSubmit={handleSubmit}>
                <button type="submit" className="admin__btn">
                    Просмотреть
                </button>
            </form>
        </div>
    )
}

export default ApprovedBackers;