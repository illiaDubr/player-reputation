import React from 'react';
import {observer} from 'mobx-react-lite';
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";
import ReportEdit from "../../../components/admin/report/ReportEdit.jsx";
import CloseReports from "../../../components/admin/report/CloseReports.jsx";

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
        <AdminMain pageTitle="Репорт метки">
            <div className="admin__wrap">
                {reportData.length > 0 ? (
                    reportData.map((item, index) => (
                        <div className="admin__box" key={index}>
                            <div className="record report">
                                <div className="record__top">
                                    <div className="record__title">
                                        {item.reporter_name}
                                    </div>
                                    <ReportEdit tag={item.backer_tag} playerId={item.player_id} recordId={item.id}/>
                                </div>
                                <div className="record__text">
                                    <div className="record__text-title">
                                        Имя игрока:
                                    </div>
                                    <div className="record__text-desc">
                                        {item.player_last_name} {item.player_first_name}
                                    </div>
                                </div>
                                <div className="record__text">
                                    <div className="record__text-title">
                                        Ущерб:
                                    </div>
                                    <div className="record__text-desc">
                                        {item.damage} $
                                    </div>
                                </div>
                                <div className="record__text">
                                    <div className="record__text-title">
                                        Комментарий:
                                    </div>
                                    <div className="record__text-desc">
                                        {item.reputation_comment}
                                    </div>
                                </div>
                                <div className="record__text">
                                    <div className="record__text-title">
                                        Причина смены метки:
                                    </div>
                                    <div className="record__text-desc">
                                        {item.report_comment}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="admin__no-data">
                        Данных нет
                    </div>
                )}
            </div>
            <CloseReports />
        </AdminMain>
    )
})

export default Report;