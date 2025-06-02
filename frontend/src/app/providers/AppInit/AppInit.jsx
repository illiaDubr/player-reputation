import { useEffect, useState } from "react";
import { useStore } from "@app/providers";
import Loader from "@shared/ui/Loader";

const AppInit = ({ children }) => {
    const { store } = useStore();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        store.checkAuth().finally(() => setReady(true));
    }, [store]);

    if (!ready) {
        return <Loader />;
    }

    return children;
};

export default AppInit;