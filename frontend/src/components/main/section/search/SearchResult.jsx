import React from "react";
import SearchLoader from "./SearchLoader.jsx";
import SearchWarning from "./SearchWarning.jsx";
import {observer} from "mobx-react-lite";
import {Context} from "../../../../api/store/storeContext.js";
import ResultItemList from "./ResultItemList.jsx";


const SearchResult = observer(() => {
    const {store} = React.useContext(Context);
    const {results, isLoading} = store;

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
            <ResultItemList results={results} />
        );
    }

    return (
        <div className="result__container">
            {content}
        </div>
    );
});

export default SearchResult;