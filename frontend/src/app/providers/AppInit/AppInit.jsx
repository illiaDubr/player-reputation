import { useEffect, useState } from "react";
import { useStore } from "@app/providers";

const AppInit = ({ children }) => {
    const { store } = useStore();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        store.checkAuth().finally(() => setReady(true));
    }, [store]);

    if (!ready) {
        return <div style={{color: "white"}}>Loading...</div>;
    }

    return children;
};

export default AppInit;