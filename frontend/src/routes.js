import {ACCOUNT_ROUTE, HOMEPAGE_ROUTE, SEARCH_ROUTE, ADMIN_REP_ROUTE} from "./utils/const.js";
import HomePage from "./pages/homePage/HomePage.jsx";
import PersonalAccount from "./pages/platform/account/PersonalAccount.jsx";
import Search from "./pages/platform/search/Search.jsx";
import Report from "./pages/admin/report/Report.jsx";

export const authRoutes = [
    {
        path: ACCOUNT_ROUTE,
        Component: PersonalAccount
    },
    {
        path: SEARCH_ROUTE,
        Component: Search
    },
]

export const publicRoutes = [
    {
        path: HOMEPAGE_ROUTE,
        Component: HomePage,
    },
    {
        path: ADMIN_REP_ROUTE,
        Component: Report,
    }
]