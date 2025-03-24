import React from 'react';
import { observer } from 'mobx-react-lite';
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";
import ReportEdit from "../../../components/admin/report/ReportEdit.jsx";

const Report = observer(() => {
    const { store } = React.useContext(Context);
    const [reportData, setReportData] = React.useState([]);

    React.useEffect(() => {
        store.reports().then((response) => {
            setReportData(response.data.notifications);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store]);

    console.log(reportData);

    return (
        <AdminMain pageTitle="Репорт метки">
            <div className="admin__wrap">
                {reportData.map((item, index) => (
                    <div className="admin__box" key={index}>
                        <div className="record report-left">
                        </div>
                        <div className="record report-right">
                            <div className="report__top">
                                <div className="">
                                </div>
                                <ReportEdit tag={item.backer_tag} player_id={item.player_id} recordId={item.id} />
                            </div>
                            <div className="record__text">
                                <div className="record__text-title">
                                    Причина репорта:
                                </div>
                                {item.report_comment}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminMain>
    )
})

export default Report;