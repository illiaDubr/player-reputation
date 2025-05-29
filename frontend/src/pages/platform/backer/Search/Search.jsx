import React from "react";
import {Helmet} from "react-helmet-async";
import SearchForm from "@features/search/player-search/ui/SearchForm";
import {SearchStoreProvider, useStore} from "@app/providers";
import SearchResult from "@features/search/player-search/ui/SearchResult";

const Search = () => {
    const [checked, setChecked] = React.useState(false);
    const {store} = useStore();
    const fund_name = store.user?.backer?.fund_for_search;
    const backerId = store.user?.id;

    return (
        <SearchStoreProvider>
            <Helmet>
                <title>
                    Проверка репутации
                </title>
            </Helmet>
            <SearchForm checked={checked} setChecked={setChecked} fund_name={fund_name}/>
            <SearchResult checked={checked} backerId={backerId}/>
        </SearchStoreProvider>
    )
}

export default Search;