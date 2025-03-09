import React from "react";
import "../../../style/platform/search/search.scss";
import {Helmet} from "react-helmet-async";
import Main from "../../../components/main/Main.jsx";
import SearchForm from "../../../components/platform/section/search/form/SearchForm.jsx";
import SearchResult from "../../../components/platform/section/search/result/SearchResult.jsx";

function Search() {
    return (
        <>
            <Helmet>
                <title>
                    Поиск игроков
                </title>
            </Helmet>
            <Main secClassName="search__wrap" secID="search">
                <SearchForm/>
                <SearchResult/>
            </Main>
        </>
    );
}

export default Search;