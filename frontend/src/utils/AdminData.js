import {ADMIN_REP_ROUTE, ADMIN_ROUTE, ADMIN_LOGS_ROUTE} from "./const.js";

export const NavListData = [
    {
        link: ADMIN_ROUTE,
        icon: "link_notification",
        text: "Измененные записи",
    },
    {
        link: ADMIN_REP_ROUTE,
        icon: "link_report",
        text: "Репорт метки",
    },
    {
        link: "",
        icon: "link_request",
        text: "",
    },
    {
        link: ADMIN_LOGS_ROUTE,
        icon: "link_logs",
        text: "Отчёт о поисках",
    },
]