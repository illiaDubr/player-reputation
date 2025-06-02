import React from "react";
import {createBrowserRouter} from "react-router-dom";
import PortalLayout from "@widgets/PortalLayout";
import {ROUTES} from "@shared/config/routes.js";
import PlatformLayout from "@widgets/PlatformLayout";
import PrivateRoute from "@app/router/PrivateRoute.jsx";
import Loader from "@shared/ui/Loader";

const HomePage = React.lazy(() => import('../../pages/portal/HomePage'))
const MainPage = React.lazy(() => import('../../pages/platform/backer/MainPage'));
const Search = React.lazy(() => import('../../pages/platform/backer/Search'));
const Profile = React.lazy(() => import('../../pages/platform/backer/Profile'));

function Delayed({ children, minDelay = 3000 }) {
    const [showLoader, setShowLoader] = React.useState(true);

    React.useEffect(() => {
        if (!showLoader) return;
        const timeout = setTimeout(() => setShowLoader(false), minDelay);
        return () => clearTimeout(timeout);
    }, [showLoader, minDelay]);

    return (
        <React.Suspense fallback={<Loader />}>
            <>
                {children}
                {showLoader && <Loader />}
            </>
        </React.Suspense>
    );
}

function lazyElement(Component) {
    return (
        <Delayed minDelay={100000}>
            <Component />
        </Delayed>
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
        element: <PrivateRoute><PlatformLayout /></PrivateRoute>,
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