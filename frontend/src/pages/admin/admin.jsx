import React from 'react';
import AdminMain from "../../components/admin/AdminMain.jsx";
import "../../style/admin/admin.scss"
import {observer} from "mobx-react-lite";
import {Context} from "../../api/store/storeContext.js";
import {NavListData} from "../../utils/AdminData.js";

const Admin = observer(() => {
    const { store } = React.useContext(Context);

    return (
        <AdminMain pageTitle="Панель Администратора">
            <div className="admin__wrap">
                <div className="admin__link-wrap">
                    {NavListData.map((item, index) => (
                        <div className="admin__link" key={index}>
                            {item.link_text}
                        </div>
                    ))}
                </div>
            </div>
        </AdminMain>
    );
})

export default Admin;