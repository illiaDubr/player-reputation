import React from "react";
import {observer} from "mobx-react-lite";
import {pastReportData} from "../../../utils/ReportData.js";
import {Context} from "../../../api/store/storeContext.js";

const PastReports = observer(() => {
    const { store } = React.useContext(Context);
    const [reportData, setReportData] = React.useState([]);

    const handleSubmit = (e, item) => {
        e.preventDefault();

        const pastReportsData = {
            status: item.status,
        }

        store.getPastReports(pastReportsData).then((response) => {
            setReportData(response.data);
        })
    }

    console.log(reportData);

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