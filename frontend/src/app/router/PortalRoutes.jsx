import React from "react";
import { Routes, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import('../../pages/portal/HomePage'))

export default function PortalRoutes() {
    return (
        <React.Suspense>
            <Routes>
                <Route index element={<HomePage />} />
            </Routes>
        </React.Suspense>
    )
}