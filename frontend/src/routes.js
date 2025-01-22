import {ACCOUNT_ROUTE, HOMEPAGE_ROUTE, SEARCH_ROUTE} from "./utils/const.js";
import HomePage from "./pages/landing/HomePage.jsx";
import PersonalAccount from "./pages/platform/account/PersonalAccount.jsx";
import Search from "./pages/platform/search/Search.jsx";

export const authRoutes = [
    {
        path: ACCOUNT_ROUTE,
        Component: PersonalAccount
    },
]

export const publicRoutes = [
    {
        path: HOMEPAGE_ROUTE,
        Component: HomePage
    },
    {
        path: SEARCH_ROUTE,
        Component: Search
    },
]