import React from "react";
import {
    ACCOUNT_ROUTE,
    HOMEPAGE_ROUTE,
    ADMIN_BACKERS_ROUTE,
    SEARCH_ROUTE,
    ADMIN_REP_ROUTE,
    ADMIN_LOGS_ROUTE,
    ADMIN_RECORDS_ROUTE,
    PROFILE_ROUTE
} from "./utils/const.js";

const HomePage = React.lazy(() => import("./pages/homePage/HomePage.jsx"));
const PersonalAccount = React.lazy(() => import("./pages/platform/account/PersonalAccount.jsx"));
const Search = React.lazy(() => import("./pages/platform/search/Search.jsx"));
const Report = React.lazy(() => import("./pages/admin/report/Report.jsx"));
const SearchLogs = React.lazy(() => import("./pages/admin/searchLogs/SearchLogs.jsx"));
const Records = React.lazy(() => import("./pages/admin/records/Records.jsx"));
const Backers = React.lazy(() => import("./pages/admin/backers/Backers.jsx"));
const Profile = React.lazy(() => import("./pages/platform/account/profile/Profile.jsx"));

export const authRoutes = [
    {
        path: ACCOUNT_ROUTE,
        Component: PersonalAccount,
    },
    {
        path: SEARCH_ROUTE,
        Component: Search,
    },
    {
        path: ADMIN_REP_ROUTE,
        Component: Report,
    },
    {
        path: ADMIN_LOGS_ROUTE,
        Component: SearchLogs,
    },
    {
      path: ADMIN_RECORDS_ROUTE,
      Component: Records,
    },
    {
        path: ADMIN_BACKERS_ROUTE,
        Component: Backers,
    },
    {
      path: PROFILE_ROUTE,
      Component: Profile,
    },
]

export const publicRoutes = [
    {
        path: HOMEPAGE_ROUTE,
        Component: HomePage,
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile,
    },
]