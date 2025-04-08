import React from "react";
import {Context} from "../../../api/store/storeContext.js";
import BackersItemList from "./BackersItemList.jsx";

const ApprovedBackers = () => {
    const {store} = React.useContext(Context);
    const [approvedBackers, setApprovedBackers] = React.useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();


        store.getApprovedBackers().then((response) => {
            setApprovedBackers(response.data.backers);
        })
    }

    console.log(approvedBackers);

    return (
        <div className="admin__wrap">
            <div className="admin__title">
                Верифицированные бэкеры
            </div>
            <BackersItemList data={approvedBackers} control={false}/>
            <form method="GET" onSubmit={handleSubmit}>
                <button type="submit" className="admin__btn">
                    Просмотреть
                </button>
            </form>
        </div>
    )
}

export default ApprovedBackers;