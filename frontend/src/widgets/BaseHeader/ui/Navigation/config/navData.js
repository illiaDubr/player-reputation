import {ROUTES} from "@shared/config/routes.js";

export const NAV_DATA = {
    PLATFORM: [
        {link: ROUTES.PLATFORM.MAIN_PAGE, icon: "link_personal_account", header_text: "Личный кабинет",},
        //{link: ROUTES.PLATFORM.PROFILE, icon: "link_profile", header_text: "Профиль",},
        {link: ROUTES.PLATFORM.SEARCH, icon: "link_search", header_text: "Поиск",},
    ],
    ADMIN: [
        {link: ROUTES.ADMIN.BACKER, icon: "link_request", header_text: "Заявки на верификацию", link_text: "Заявки на верификацию. Все бекеры",},
        {icon: "link_report", header_text: "Корректировка меток", link_text: "Заявки на корректировку меток",},
        {icon: "link_logs", header_text: "Отчёт о поисках", link_text: "Аналитика",},
        {link: ROUTES.PLATFORM.SEARCH, icon: "link_search", header_text: "Поиск",},
    ],
}