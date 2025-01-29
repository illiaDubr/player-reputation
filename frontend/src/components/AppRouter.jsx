import React from 'react';
import {Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes.js";
import NotFoundPage from "../pages/platform/404/NotFoundPage.jsx";
import {Context} from "../api/store/storeContext.js";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {store} = React.useContext(Context);

    return (
        <Routes>
            {store.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
})

export default AppRouter;