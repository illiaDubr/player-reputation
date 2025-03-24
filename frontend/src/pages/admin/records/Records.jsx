import React from 'react';
import {Context} from "../../../api/store/storeContext.js";
import {observer} from "mobx-react-lite";
import AdminMain from "../../../components/admin/AdminMain.jsx";

const Records = observer(() => {
    const { store } = React.useContext(Context);
    const [recordsData, setRecordsData] = React.useState([]);

    React.useEffect(() => {
        store.returnRecords().then((response) => {
            setRecordsData(response.data.data);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store]);

    console.log(recordsData);

    return (
        <AdminMain pageTitle="Измененные записи">
            <div className="admin__wrap">
                {recordsData.map((item, index) => (
                    <div className="admin__box" key={index}>
                        <div className="record">
                            <div className="record__text">
                                <div className="record__text-title">
                                    Причина репорта:
                                </div>
                                {item.old_data.comment}
                            </div>
                        </div>
                        <div className="record">
                            <div className="record__text">
                                <div className="record__text-title">
                                    Причина репорта:
                                </div>
                                {item.new_data.comment}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AdminMain>
    );
})

export default Records;