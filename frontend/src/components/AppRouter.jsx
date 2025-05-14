import React, {Suspense} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes.js";
import NotFoundPage from "../pages/platform/404/NotFoundPage.jsx";
import {Context} from "../api/store/storeContext.js";
import {observer} from "mobx-react-lite";
import Admin from "../pages/admin/admin.jsx";

function CatchAll() {
    const location = useLocation();
    if (location.pathname.endsWith("/admin/admin")) {
        return <Admin />;
    }

    return <NotFoundPage />;
}

const AppRouter = observer(() => {
    const {store} = React.useContext(Context);

    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <Routes>
                {store.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component />} />
                )}
                <Route path="*" element={<CatchAll />} />
            </Routes>
        </Suspense>
    );
})

export default AppRouter;