import React from "react";
import { useStore } from "@app/providers";
import { Navigate } from "react-router-dom";
import {ROUTES} from "@shared/config/routes.js";

const PrivateRoute = ({ children }) => {
    const { store } = useStore();
    const role = store.user?.role;

    if (store.isLoading) {
        return null;
    }

    if (!store.isAuth) {
        return <Navigate to="/" replace />;
    }

    if (role === "admin") {
        return <Navigate to={ROUTES.ADMIN.HOME} replace />;
    }
    if (role === "backer") {
        return <Navigate to={ROUTES.PLATFORM.MAIN_PAGE} replace />;
    }

    return children;
};

export default PrivateRoute;