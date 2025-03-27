import React from 'react';
import {observer} from 'mobx-react-lite';
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";
import CloseReports from "../../../components/admin/report/CloseReports.jsx";
import ReportItem from "../../../components/admin/report/ReportItem.jsx";
import {reportText} from "../../../utils/AdminData.js";

const Report = observer(() => {
    const {store} = React.useContext(Context);
    const [reportData, setReportData] = React.useState([]);

    React.useEffect(() => {
        store.getReports().then((response) => {
            setReportData(response.data.data);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store]);

    console.log(reportData);

    return (
        <AdminMain pageTitle="Репорт метки" text={reportText}>
            <div className="admin__wrap">
                <ReportItem data={reportData} tagEdit={true} closeReport={true}/>
            </div>
            <CloseReports />
        </AdminMain>
    );
})

export default Report;