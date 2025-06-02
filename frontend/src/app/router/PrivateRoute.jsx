import React from "react";
import { useStore } from "@app/providers";
import { Navigate } from "react-router-dom";
import Loader from "@shared/ui/Loader/index.js";
import {ROUTES} from "@shared/config/routes.js";

const PrivateRoute = ({ children, allowedRoles }) => {
    const { store } = useStore();

    if (store.isLoading ) {
        return <Loader />;
    }

    if (!store.isAuth) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(store.user?.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;