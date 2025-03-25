import React from "react";
import {observer} from "mobx-react-lite";
import {pastReportData} from "../../../utils/ReportData.js";
import {Context} from "../../../api/store/storeContext.js";

const PastReports = observer(() => {

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (

        <>
            {pastReportData.map((item, index) => (
                <div className="admin__wrap" key={index}>
                    <div className="admin__title">
                        {item.title}
                    </div>
                    <form method="GET" onSubmit={handleSubmit}>
                        <button type="submit" className="admin__btn">
                            Просмотреть
                        </button>
                    </form>
                </div>
            ))}
        </>
    )
})

export default PastReports;