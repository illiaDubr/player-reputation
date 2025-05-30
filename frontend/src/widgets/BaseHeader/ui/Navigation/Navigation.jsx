import React from "react";
import IconSvg from "@shared/ui/IconSvg/index.js";
import styles from "./Navigation.module.scss";

const Navigation = ({onButtonClick, navList}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
        onButtonClick();
    }

    return (
        <>
            <nav className={`${styles.navigation}`}>
                <ul className={`${styles[`navigation__list`]}`}>
                    {navList && React.cloneElement(navList, { isOpen })}
                </ul>
            </nav>
            <button className={`${styles[`navigation__toggle-button`]} ${isOpen ? `${styles[`navigation__toggle-button--open`]}` : ""}`} onClick={handleButtonClick}>
                <span>
                    <IconSvg width={20} height={20} id="arrow"/>
                </span>
            </button>
        </>
    )
}

export default Navigation;