import React from 'react';
import AdminMain from "../../components/admin/AdminMain.jsx";
import {Context} from "../../api/store/storeContext.js";
import "../../style/admin/admin.scss"
import {observer} from "mobx-react-lite";

const Admin = observer(() => {
    const { store } = React.useContext(Context);
    const [recordsData, setRecordsData] = React.useState([]);

    React.useEffect(() => {
        store.returnRecords().then((response) => {
            setRecordsData(response.data);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store]);

    console.log(recordsData);

    return (
        <AdminMain pageTitle="Измененные записи">
            <div className="admin__wrap">

            </div>
        </AdminMain>
    );
})

export default Admin;