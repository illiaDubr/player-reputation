import React from 'react';
import {Context} from "../../../api/store/storeContext.js";


export const useNotifications = () => {
    const { store } = React.useContext(Context);
    const [notifications, setNotifications] = React.useState({
        reports: 0,
        records: 0,
    });

    const updateNotifications = React.useCallback(() => {
        Promise.all([
            store.getReports(),
            store.getRecords(),
        ])
            .then(([reportsResp, recordsResp]) => {
                const getCount = (response) =>
                    Array.isArray(response.data.data) ? response.data.data.length : 0;
                const counts = {
                    reports: getCount(reportsResp),
                    records: getCount(recordsResp),
                };
                setNotifications(counts);
            })
            .catch((error) => {
                console.error("Ошибка при запросах:", error);
            });
    }, [store]);

    React.useEffect(() => {
        updateNotifications();
        const intervalId = setInterval(updateNotifications, 60000);
        return () => clearInterval(intervalId);
    }, [updateNotifications]);

    return notifications;
};