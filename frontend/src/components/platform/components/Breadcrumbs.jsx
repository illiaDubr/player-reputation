import { Link, useLocation } from "react-router-dom";
import {HOMEPAGE_ROUTE, ACCOUNT_ROUTE, SEARCH_ROUTE, PROFILE_ROUTE} from "../../../utils/const.js";

const routeNames = {
    [HOMEPAGE_ROUTE]: "Player`s Reputation",
    [SEARCH_ROUTE]: "Поиск игроков",
    [ACCOUNT_ROUTE]: "Личный кабинет",
    [PROFILE_ROUTE]: "Профиль",
};

const Breadcrumbs = () => {
    const location = useLocation();
    const pathSegments = location.pathname
        .split("/")
        .filter((segment) => segment && segment !== "platform"); // Исключаем "platform"

    return (
        <nav className="breadcrumbs">
            <Link className="previous__page" to={HOMEPAGE_ROUTE}>Player`s Reputation</Link>
            {pathSegments.map((segment, index) => {
                const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
                const isLast = index === pathSegments.length - 1;

                // Проверяем, есть ли путь в routeNames
                const name = Object.keys(routeNames).find((key) => key.endsWith(path))
                    ? routeNames[Object.keys(routeNames).find((key) => key.endsWith(path))]
                    : decodeURIComponent(segment);

                return isLast ? (
                    <span key={path} className="current__page"> / {name}</span>
                ) : (
                    <span key={path}>
                        {" / "}
                        <Link className="breadcrumb__link" to={path}>{name}</Link>
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;