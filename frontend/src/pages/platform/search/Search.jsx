import React from "react";
import "../../../style/platform/search/search.scss";
import {Helmet} from "react-helmet-async";
import Main from "../../../components/main/Main.jsx";
import SearchForm from "../../../components/platform/section/search/form/SearchForm.jsx";
import SearchResult from "../../../components/platform/section/search/result/SearchResult.jsx";
import {Context} from "../../../api/store/storeContext.js";

function Search() {
    const {store} = React.useContext(Context);
    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        store.checkAuth().then(() => {
            console.log("Данные пользователя:", store.user.id);
        });
    }, [store]);

    return (
        <>
            <Helmet>
                <title>
                    Поиск игроков
                </title>
            </Helmet>
            <Main secClassName="search__wrap" secID="search">
                <SearchForm checked={checked} setChecked={setChecked} />
                <SearchResult backer={store.user.id} checked={checked} />
            </Main>
        </>
    );
}

export default Search;