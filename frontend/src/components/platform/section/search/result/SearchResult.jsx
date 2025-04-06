import React from "react";
import SearchLoader from "./SearchLoader.jsx";
import SearchWarning from "./SearchWarning.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../../api/store/storeContext.js";
import ResultItemList from "./ResultItemList.jsx";

const SearchResult = observer(({backer, checked}) => {
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
            <SearchWarning id="notification">Для отображения результата поиска заполните поля</SearchWarning>
        ) : (
            <SearchWarning id="red_notification">Данные отсутствуют</SearchWarning>
        );
    } else {
        content = (
            <>
                <div className="result__header">
                    {checked &&
                        <div className="result__length">
                            Всего записей: {results.length}
                        </div>
                    }
                </div>
                <ResultItemList results={results} backer={backer} backersFund={backersFund}/>
            </>
        );
    }

    return (
        <div className="result__container">
            {content}
        </div>
    );
});

export default SearchResult;