import React from 'react';
import {Link} from "react-router-dom";
import IconSvg from "../../components/IconSvg.jsx";
import {HOMEPAGE_ROUTE} from "../../../../utils/const.js";
import LogoutBtn from "../../components/LogoutBtn.jsx";

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
                    <li className="navigation__list-item">
                        <Link to={HOMEPAGE_ROUTE}>
                            <IconSvg width={70} height={44} id="logo"/>
                        </Link>
                    </li>
                    <li className="navigation__list-item">
                        <LogoutBtn />
                    </li>
                </ul>
            </nav>
            <button className="header__btn" onClick={handleButtonClick}>
                <IconSvg width={20} height={20} id="arrow"/>
            </button>
        </>
    )
}

export default Navigation;