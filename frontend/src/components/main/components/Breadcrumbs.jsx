import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();

    const routeNames = {
        "/": "Player`s Reputation",
        "/main/section/search": "Поиск игроков",
        "/main/section/PersonalAccount": "Личный кабинет",
    };

    const currentPath = location.pathname;
    const currentPage = routeNames[currentPath] || "Страница не найдена";

    return (
        <nav className="breadcrumbs">
            {currentPath !== "/" && (
                <>
                    <Link className="previous__page" to="/">Player`s Reputation</Link> / <span className="current__page">{currentPage}</span>
                </>
            )}
            {currentPath === "/" && <span>Player`s Reputation</span>}
        </nav>
    );
};

export default Breadcrumbs;