import React from 'react';
import { observer } from 'mobx-react-lite';
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";

const Report = observer(() => {
    const { store } = React.useContext(Context);
    const [adminData, setAdminData] = React.useState(null);

    React.useEffect(() => {
        store.AdminData().then((response) => {
            setAdminData(response);
            console.log("Полученные данные админа:", response);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store]);

    return (
        <AdminMain pageTitle="Репорт метки">

        </AdminMain>
    )
})

export default Report;