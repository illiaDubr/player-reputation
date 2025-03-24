import React from 'react';
import AdminMain from "../../components/admin/AdminMain.jsx";
import "../../style/admin/admin.scss"
import {observer} from "mobx-react-lite";

const Admin = observer(() => {


    return (
        <AdminMain pageTitle="">
            <div className="admin__wrap">

            </div>
        </AdminMain>
    );
})

export default Admin;