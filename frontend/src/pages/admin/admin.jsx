import React from 'react';
import AdminMain from "../../components/admin/AdminMain.jsx";
import "../../style/admin/admin.scss"
import {observer} from "mobx-react-lite";
import {Context} from "../../api/store/storeContext.js";

const Admin = observer(() => {
    const { store } = React.useContext(Context);

    return (
        <AdminMain pageTitle="Панель Администратора">
            <div className="admin__wrap">

            </div>
        </AdminMain>
    );
})

export default Admin;