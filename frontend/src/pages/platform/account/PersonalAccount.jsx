import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import "../../../style/helpers/fonts.scss";
import Main from "../../../components/main/Main.jsx";
import {SEARCH_ROUTE} from "../../../utils/const.js";



function PersonalAccount() {
    return (
        <>
            <Helmet>
                <title>
                    Личный кабинет
                </title>
            </Helmet>
            <Main>
                <h1>
                    Личный кабинет
                </h1>
                <Link className="link" to={SEARCH_ROUTE}>Search</Link>
            </Main>
        </>
    )
}

export default PersonalAccount;