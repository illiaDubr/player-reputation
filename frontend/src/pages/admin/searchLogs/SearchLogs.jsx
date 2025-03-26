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

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            const response = store.download();
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "backup_file.sql";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Ошибка при скачивании файла:", error);
        }
    }

    return (
        <AdminMain pageTitle="Отчёт о поисках">
            <div className="admin__wrap">
                {logsData && (
                    <div className="count__wrap">
                        {logsData.count} поисков
                    </div>
                )}
            </div>

            <div className="admin__wrap">
                <div className="admin__title">
                    Скачать данные
                </div>
                <form method="GET" className="" onSubmit={handleSubmit}>
                    <button className="admin__btn" type="submit">
                        Скачать
                    </button>
                </form>
            </div>
        </AdminMain>
    )
})

export default SearchLogs;