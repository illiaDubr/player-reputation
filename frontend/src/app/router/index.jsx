import React from "react";
import {createBrowserRouter} from "react-router-dom";
import PortalLayout from "@widgets/PortalLayout";
import {ROUTES} from "@shared/config/routes.js";
import PlatformLayout from "@widgets/PlatformLayout";
import PrivateRoute from "@app/router/PrivateRoute.jsx";
import Loader from "@shared/ui/Loader";
import AdminLayout from "@widgets/AdminLayout";

const HomePage = React.lazy(() => import('../../pages/portal/HomePage'))
const MainPage = React.lazy(() => import('../../pages/platform/backer/MainPage'));
const Search = React.lazy(() => import('../../pages/platform/backer/Search'));
const Profile = React.lazy(() => import('../../pages/platform/backer/Profile'));
const AdminHomePage = React.lazy(() => import('../../pages/admin/HomePage'));

function Delayed({ children, minDelay = 3000 }) {
    const [showLoader, setShowLoader] = React.useState(true);
    const [loaderClass, setLoaderClass] = React.useState("loader--active");

    React.useEffect(() => {
        if (!showLoader) return;

        const classTimeout = setTimeout(() => setLoaderClass(""), minDelay);

        const hideTimeout = setTimeout(() => setShowLoader(false), minDelay + 500);

        return () => {
            clearTimeout(classTimeout);
            clearTimeout(hideTimeout);
        };
    }, [showLoader, minDelay]);

    return (
        <React.Suspense fallback={<Loader className={loaderClass} />}>
            <>
                {children}
                {showLoader && <Loader className={loaderClass} />}
            </>
        </React.Suspense>
    );
}

function lazyElement(Component) {
    return (
        <Delayed minDelay={2500}>
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
    {
        path: `${ROUTES.ADMIN.BASE}/*`,
        element: <PrivateRoute><AdminLayout /></PrivateRoute>,
        handle: {
            breadcrumb: "Домашняя страница",
        },
        children: [
            {
                path: ROUTES.ADMIN.HOME.replace(`${ROUTES.ADMIN.BASE}/`, ''),
                element: lazyElement(AdminHomePage),
                handle: {
                    breadcrumb: "Домашняя страница"
                }
            },
        ],
    },
])

export default router;