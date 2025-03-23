import React from 'react';
import { observer } from 'mobx-react-lite';
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";

const Report = observer(() => {
    const { store } = React.useContext(Context);
    const [adminData, setAdminData] = React.useState([]);

    React.useEffect(() => {
        store.AdminData().then((response) => {
            setAdminData(response.data.notifications);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store]);

    console.log(adminData);

    return (
        <AdminMain pageTitle="Репорт метки">
            <div className="report__wrap">
                {adminData.map((item, index) => (
                    <div className="report__box" key={index}>
                        <div className="report report-left">
                        </div>
                        <div className="report report-right">
                            <div className="">
                            </div>
                            <div className="report__text">
                                <div className="report__text-title">
                                    Причина репорта:
                                </div>
                                {item.data.comment}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminMain>
    )
})

export default Report;