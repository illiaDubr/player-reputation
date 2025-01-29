import React from 'react';
import {Link} from "react-router-dom";
import IconSvg from "../../components/IconSvg.jsx";

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
                        <Link to="/">
                            <IconSvg width={70} height={44} id={'logo'}/>
                        </Link>
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