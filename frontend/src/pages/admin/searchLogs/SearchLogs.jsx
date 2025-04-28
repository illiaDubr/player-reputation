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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await store.download();
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

    console.log(logsData);

    return (
        <AdminMain pageTitle="Отчёт о поисках">
            <div className="admin__wrap">
                <div className="search-logs">
                    <div className="search-logs__header">
                        <div className="search-logs__title">
                            Верифицированные бекеры
                        </div>
                        <div className="search-logs__title">
                            Выполненные ими поиски
                        </div>
                    </div>
                    <div className="search-logs__list">
                        {logsData.byFund?.slice(1).map((item, index) => (
                            <div className="search-logs__item" key={index}>
                                <div className="search-logs__fund-name">
                                    {item.fund_name}
                                </div>
                                <div className="search-logs__count">
                                    {item.count}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="search-logs__total">
                        Всего выполнено поисков: {logsData.total}
                    </div>
                </div>
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