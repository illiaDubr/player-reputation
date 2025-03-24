import React from 'react';
import {Link, useLocation} from "react-router-dom";
import IconSvg from "../../components/IconSvg.jsx";
import {HOMEPAGE_ROUTE} from "../../../../utils/const.js";
import LogoutBtn from "../../components/LogoutBtn.jsx";
import NavAdminList from "../../../admin/components/NavAdminList.jsx";
import NavList from "./NavList.jsx";

function AdminRoutes({isOpen}) {
    const location = useLocation();
    const allowedSuffixes = ["/admin", "/report", "/searchLogs"];
    if (allowedSuffixes.some(suffix => location.pathname.endsWith(suffix))) {
        return <NavAdminList isOpen={isOpen} />;
    }
    return <NavList />
}

const Navigation = ({onButtonClick}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
        onButtonClick();
    }

    return (
        <>
            <nav className="navigation">
                <ul className="navigation__list">
                    <AdminRoutes isOpen={isOpen} />
                </ul>
            </nav>
            <button className="header__btn" onClick={handleButtonClick}>
                <IconSvg width={20} height={20} id="arrow"/>
            </button>
        </>
    )
}

export default Navigation;