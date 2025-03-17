import {ACCOUNT_ROUTE, HOMEPAGE_ROUTE, SEARCH_ROUTE, ADMIN_ROUTE} from "./utils/const.js";
import HomePage from "./pages/homePage/HomePage.jsx";
import PersonalAccount from "./pages/platform/account/PersonalAccount.jsx";
import Search from "./pages/platform/search/Search.jsx";
import Admin from "./pages/admin/admin.jsx";

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
        path: ADMIN_ROUTE,
        Component: Admin
    },
]

export const publicRoutes = [
    {
        path: HOMEPAGE_ROUTE,
        Component: HomePage
    },
]