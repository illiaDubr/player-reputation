import React, { createContext, useContext } from "react";
import Store from "@shared/model/store/store.js";

const store = new Store();

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
    React.useEffect(() => {
        store.checkAuth();
    }, []);

    return (
        <StoreContext.Provider value={{store}}>
            {children}
        </StoreContext.Provider>
    )
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
};