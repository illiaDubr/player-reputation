import React from 'react';
import {observer} from 'mobx-react-lite';
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";
import CloseReports from "../../../components/admin/report/CloseReports.jsx";
import ReportItemList from "../../../components/admin/report/ReportItemList.jsx";
import {reportText} from "../../../utils/AdminData.js";
import {Helmet} from "react-helmet-async";

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

    return (
        <>
            <Helmet>
                <title>
                    Репорт метки
                </title>
            </Helmet>
            <AdminMain pageTitle="Репорт метки" text={reportText}>
                <div className="admin__wrap">
                    <ReportItemList data={reportData} tagEdit={true} closeReport={true}/>
                </div>
                <CloseReports />
            </AdminMain>
        </>
    );
})

export default Report;