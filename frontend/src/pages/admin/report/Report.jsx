import React from 'react';
import { observer } from 'mobx-react-lite';
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";
import ReportEdit from "../../../components/admin/report/ReportEdit.jsx";
import PastReports from "../../../components/admin/report/PastReports.jsx";

const Report = observer(() => {
    const { store } = React.useContext(Context);
    const [reportData, setReportData] = React.useState([]);

    React.useEffect(() => {
        store.getReports().then((response) => {
            setReportData(response.data);
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
                        <div className="record report">
                            <div className="record__top">
                                <div className="record__title">

                                </div>

                            </div>
                            <div className="record__text">
                                <div className="record__text-title">
                                    Имя игрока:
                                </div>
                                <div className="record__text-desc">

                                </div>
                            </div>
                            <div className="record__text">
                                <div className="record__text-title">
                                    Ущерб:
                                </div>
                                <div className="record__text-desc">

                                </div>
                            </div>
                            <div className="record__text">
                                <div className="record__text-title">
                                    Комментарий:
                                </div>
                                <div className="record__text-desc">
                                </div>
                            </div>
                            <div className="record__text">
                                <div className="record__text-title">
                                    Причина смены метки:
                                </div>
                                <div className="record__text-desc">
                                    {item.comment}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <PastReports />
        </AdminMain>
    )
})

export default Report;