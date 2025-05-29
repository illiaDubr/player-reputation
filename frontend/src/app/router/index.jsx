import React from "react";
import {createBrowserRouter} from "react-router-dom";
import PortalLayout from "@widgets/PortalLayout";
import {ROUTES} from "@shared/config/routes.js";
import PlatformLayout from "@widgets/PlatformLayout";
import PrivateRoute from "@app/router/PrivateRoute.jsx";

const HomePage = React.lazy(() => import('../../pages/portal/HomePage'))
const MainPage = React.lazy(() => import('../../pages/platform/backer/MainPage'));
const Search = React.lazy(() => import('../../pages/platform/backer/Search'));
const Profile = React.lazy(() => import('../../pages/platform/backer/Profile'));

function lazyElement(Component) {
    return (
        <React.Suspense>
            <Component />
        </React.Suspense>
    );
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <PortalLayout />,
        children: [
            {
                element: lazyElement(HomePage),
                index: true
            },
        ]
    },
    {
        path: `${ROUTES.PLATFORM.BASE}/*`,
        element: <PlatformLayout />,
        handle: {
            breadcrumb: "Player`s Reputation",
        },
        children: [
            {
                path: ROUTES.PLATFORM.MAIN_PAGE.replace(`${ROUTES.PLATFORM.BASE}/`, ''),
                element: lazyElement(MainPage),
                handle: {
                    breadcrumb: "Личный кабинет"
                },
            },
            {
                path: ROUTES.PLATFORM.SEARCH.replace(`${ROUTES.PLATFORM.BASE}/`, ''),
                element: lazyElement(Search),
                handle: {
                    breadcrumb: "Проверка репутации"
                },
            },
            {
                path: ROUTES.PLATFORM.PROFILE.replace(`${ROUTES.PLATFORM.BASE}/`, ''),
                element: lazyElement(Profile),
                handle: {
                    breadcrumb: "Профиль"
                }
            }
        ],
    },
])

export default router;