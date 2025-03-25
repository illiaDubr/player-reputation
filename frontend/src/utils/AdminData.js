import {ADMIN_REP_ROUTE, ADMIN_LOGS_ROUTE, ADMIN_RECORDS_ROUTE, SEARCH_ROUTE} from "./const.js";

export const NavListData = [
    {
        link: "",
        icon: "link_request",
        header_text: "",
        link_text: "Заявки на верификацию. Все бекеры",
    },
    {
        link: ADMIN_REP_ROUTE,
        icon: "link_report",
        header_text: "Репорты меток",
        link_text: "Скорректированные репутационные записи. История",
    },
    {
        link: ADMIN_RECORDS_ROUTE,
        icon: "link_notification",
        header_text: "Корректировка меток",
        link_text: "Заявки на корректировку меток",
    },
    {
        link: ADMIN_LOGS_ROUTE,
        icon: "link_logs",
        header_text: "Отчёт о поисках",
        link_text: "Аналитика",
    },
    {
        link: SEARCH_ROUTE,
        icon: "link_search",
        header_text: "Поиск по базе",
        link_text: "Поиск по базе",
    },
    {
        link: "",
        icon: "",
        header_text: "",
        link_text: "Логирование изменений",
    },
]

export const recordsText = "Задача администратора - проверить, корректно ли бэкер проставил новую метку в соответсствии с внесенной новый информацией по игроку. \n" +
    "Если корректно - \"просмотрено\" , если не корректно \"на обсуждение\" + написать бэкеру в личные сообщения в дискорде за уточнением."