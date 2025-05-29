import React from "react";
import { useStore } from "@app/providers";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { store } = useStore();

    if (store.isLoading) {
        return null;
    }

    if (!store.isAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;