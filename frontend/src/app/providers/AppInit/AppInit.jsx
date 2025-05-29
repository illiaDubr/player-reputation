import { useEffect, useState } from "react";
import { useStore } from "@app/providers";

const AppInit = ({ children }) => {
    const { store } = useStore();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        store.checkAuth().finally(() => setReady(true));
    }, []);

    if (!ready) return null; // или <Loader />

    return children;
};

export default AppInit;