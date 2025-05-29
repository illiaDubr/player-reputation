import React from "react";
import SearchStore from "@features/search/model/store";

const SearchStoreContext = React.createContext({ searchStore: null });

export const SearchStoreProvider = ({ children }) => {
    const searchStore = React.useMemo(() => new SearchStore(), []);
    return (
        <SearchStoreContext.Provider value={searchStore}>
            {children}
        </SearchStoreContext.Provider>
    );
};

export const useSearchStore = () => React.useContext(SearchStoreContext);