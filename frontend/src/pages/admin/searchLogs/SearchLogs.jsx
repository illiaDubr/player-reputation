import React from "react";
import {observer} from "mobx-react-lite";
import AdminMain from "../../../components/admin/AdminMain.jsx";
import {Context} from "../../../api/store/storeContext.js";

const SearchLogs = observer(() => {
    const { store } = React.useContext(Context);
    const [logsData, setLogsData] = React.useState([]);

    React.useEffect(() => {
        store.searchLogs().then((response) => {
            setLogsData(response.data);
        }).catch((error) => {
            console.error("Ошибка запроса:", error);
        });
    }, [store]);

    console.log(logsData);

    return (
        <AdminMain pageTitle="Отчёт о поисках">
            <div className="admin__wrap">
                {logsData && (
                    <div className="count__wrap">
                        {logsData.count} поисков по маршруту
                    </div>
                )}
            </div>
        </AdminMain>
    )
})

export default SearchLogs;