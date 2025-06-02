import React from "react";
import { useStore } from "@app/providers";
import { Navigate } from "react-router-dom";
import Loader from "@shared/ui/Loader/index.js";

const PrivateRoute = ({ children }) => {
    const { store } = useStore();

    if (store.isLoading ) {
        return <Loader />;
    }

    if (!store.isAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;