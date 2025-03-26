import React from 'react';
import AdminMain from "../../components/admin/AdminMain.jsx";
import "../../style/admin/admin.scss"
import {observer} from "mobx-react-lite";
import {NavListData} from "../../utils/AdminData.js";
import {Link} from "react-router-dom";
import Notification from "../../components/admin/components/Notification.jsx";
import {useNotifications} from "../../components/admin/components/useNotifications.jsx";

const Admin = observer(() => {
    const notifications = useNotifications();

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
                                    <Notification value={notification} fontSize={17}/>
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