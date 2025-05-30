import React from "react";
import styles from "./SearchResult.module.scss";
import { observer } from "mobx-react-lite";
import {useSearchStore} from "@app/providers";
import SearchLoader from "@features/search/player-search/ui/SearchLoader";
import SearchWarning from "@features/search/player-search/ui/SearchWarning";
import ResultItemList from "@features/search/player-search/ui/SearchResult/ui/ResultItemList";

const SearchResult = observer(({checked, backerId}) => {
    const searchStore = useSearchStore();

    const {results, isLoading} = searchStore;

    return (
        <div className={styles.results}>
            {isLoading && <SearchLoader />}

            {!isLoading && (!Array.isArray(results) || results.length === 0) && (
                <SearchWarning id={Array.isArray(results) ? "notification" : "red_notification"}>
                    {Array.isArray(results)
                        ? "Для отображения результата поиска заполните поля"
                        : "Данные отсутствуют"}
                </SearchWarning>
            )}

            {!isLoading && Array.isArray(results) && results.length > 0 && (
                <>
                    {checked && (
                        <div className={styles[`result__length`]}>
                            Всего записей: {results.length}
                        </div>
                    )}
                    <ResultItemList results={results} checked={checked} backerId={backerId}/>
                </>
            )}
        </div>
    )
})

export default SearchResult;