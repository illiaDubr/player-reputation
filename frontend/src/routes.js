import {ACCOUNT_ROUTE, HOMEPAGE_ROUTE, SEARCH_ROUTE, ADMIN_REP_ROUTE, ADMIN_LOGS_ROUTE} from "./utils/const.js";
import HomePage from "./pages/homePage/HomePage.jsx";
import PersonalAccount from "./pages/platform/account/PersonalAccount.jsx";
import Search from "./pages/platform/search/Search.jsx";
import Report from "./pages/admin/report/Report.jsx";
import SearchLogs from "./pages/admin/searchLogs/SearchLogs.jsx";

export const authRoutes = [
    {
        path: ACCOUNT_ROUTE,
        Component: PersonalAccount
    },
    {
        path: SEARCH_ROUTE,
        Component: Search
    },
    {
        path: ADMIN_REP_ROUTE,
        Component: Report,
    },
    {
        path: ADMIN_LOGS_ROUTE,
        Component: SearchLogs,
    },
]

export const publicRoutes = [
    {
        path: HOMEPAGE_ROUTE,
        Component: HomePage,
    },
]