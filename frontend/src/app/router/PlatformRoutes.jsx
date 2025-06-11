import React from "react";
import { Routes, Route } from 'react-router-dom';
import {ROUTES} from "@shared/config/routes.js";

const MainPage = React.lazy(() => import('../../pages/platform/backer/MainPage'));
const Search = React.lazy(() => import('../../pages/platform/backer/Search'));

export default function PlatformRoutes() {
    return (
        <React.Suspense>
            <Routes>
                <Route path={ROUTES.PLATFORM.MAIN_PAGE.replace(`${ROUTES.PLATFORM.BASE}/`, '')} element={<MainPage />} />
                <Route path={ROUTES.PLATFORM.SEARCH.replace(`${ROUTES.PLATFORM.BASE}/`, '')} element={<Search />} />
            </Routes>
        </React.Suspense>
    )
}