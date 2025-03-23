import React from 'react';
import { observer } from 'mobx-react-lite';
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";

const Report = observer(() => {
    const { store } = React.useContext(Context);
    const [adminData, setAdminData] = React.useState(null);

    React.useEffect(() => {
        store.AdminData().then((response) => {
            setAdminData(response.data);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store]);

    console.log(adminData);

    return (
        <AdminMain pageTitle="Репорт метки">
            <div className="report__wrap">
                {adminData.map((item, index) => (
                    <div className="" key={index}>
                    </div>
                ))}
            </div>
        </AdminMain>
    )
})

export default Report;