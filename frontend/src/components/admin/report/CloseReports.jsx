import React from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../../api/store/storeContext.js";
import ReportItemList from "./ReportItemList.jsx";

const CloseReports = observer(() => {
    const {store} = React.useContext(Context);
    const [closeReports, setCloseReports] = React.useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        store.getCloseReports().then((response) => {
            setCloseReports(response.data.data);
        })
    }

    return (
        <div className="admin__wrap">
            <div className="admin__title">
                Закрытые репорты
            </div>
            <ReportItemList data={closeReports} tagEdit={false} closeReport={false}/>
            <form method="GET" onSubmit={handleSubmit}>
                <button type="submit" className="admin__btn">
                    Просмотреть
                </button>
            </form>
        </div>

    )
})

export default CloseReports;