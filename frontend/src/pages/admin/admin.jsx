import React from 'react';
import AdminMain from "../../components/admin/AdminMain.jsx";
import "../../style/admin/admin.scss"
import {observer} from "mobx-react-lite";
import {Context} from "../../api/store/storeContext.js";
import {NavListData} from "../../utils/AdminData.js";
import {Link} from "react-router-dom";
import Notification from "../../components/admin/components/Notification.jsx";

const Admin = observer(() => {
    const {store} = React.useContext(Context);

    const [notifications, setNotifications] = React.useState({
        reports: 0,
        records: 0,
    });

    console.log(notifications);

    React.useEffect(() => {
        Promise.all([
            store.getReports(),
            store.getRecords(),
        ]).then(([reportsResp, records]) => {
            const getCount = (response) =>
                Array.isArray(response.data.data) ? response.data.data.length : 0;
            const counts = {
                reports: getCount(reportsResp),
                records: getCount(records),
            };
            console.log("Количество reports:", counts.reports);
            console.log("Количество records:", counts.records);
            setNotifications(counts);
        }).catch((error) => {
            console.error("Ошибка при запросах:", error);
        })
    }, [store])

    return (
        <AdminMain pageTitle="Панель Администратора">
            <div className="admin__wrap">
                <div className="admin__link-wrap">
                    {NavListData.map((item, index) => {
                        const notification = notifications[item.id]
                            ? notifications[item.id]
                            : "";
                        const randomTop = Math.floor(Math.random() * 350) + "px";
                        const randomLeft = Math.floor(Math.random() * 350) + "px";
                        return (
                            <Link to={item.link} className="admin__link" key={index}>
                                <span style={{top: randomTop, left: randomLeft}}></span>
                                <div className="admin__link-text">
                                    {item.link_text}
                                </div>
                                {notification && (
                                    <Notification value={notification}/>
                                )}
                            </Link>
                        )
                    })}
                </div>
            </div>
        </AdminMain>
    );
})

export default Admin;