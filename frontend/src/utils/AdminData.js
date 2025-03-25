import {ADMIN_REP_ROUTE, ADMIN_ROUTE, ADMIN_LOGS_ROUTE, ADMIN_RECORDS_ROUTE} from "./const.js";

export const NavListData = [
    {
        link: ADMIN_RECORDS_ROUTE,
        icon: "link_notification",
        text: "Записи",
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

export const recordsText = "Задача администратора - проверить, корректно ли бэкер проставил новую метку в соответсствии с внесенной новый информацией по игроку. \n" +
    "Если корректно - \"просмотрено\" , если не корректно \"на обсуждение\" + написать бэкеру в личные сообщения в дискорде за уточнением."