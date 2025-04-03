import React from "react";
import SearchLoader from "./SearchLoader.jsx";
import SearchWarning from "./SearchWarning.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../../api/store/storeContext.js";
import ResultItemList from "./ResultItemList.jsx";

const SearchResult = observer(({backer}) => {
    const {store} = React.useContext(Context);
    const {results, isLoading} = store;
    const backersFund = store.user?.backer?.fund_for_search;

    React.useEffect(() => {
        store.checkAuth().then(() => {
            console.log("Данные пользователя:", store.user);
        });
    }, [store]);

    let content;

    if (isLoading) {
        content = <SearchLoader/>;
    } else if (!Array.isArray(results) || results.length === 0) {
        content = Array.isArray(results) && results.length === 0 ? (
            <SearchLoader/>
        ) : (
            <SearchWarning id="red_notification">Данные отсутствуют</SearchWarning>
        );
    } else {
        content = (
            <ResultItemList results={results} backer={backer} backersFund={backersFund}/>
        );
    }

    return (
        <div className="result__container">
            {content}
        </div>
    );
});

export default SearchResult;