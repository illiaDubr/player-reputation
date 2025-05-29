import React from "react";
import StickyBox from "react-sticky-box";
import styles from "./BaseHeader.module.scss";
import Navigation from "@widgets/BaseHeader/ui/Navigation";

const BaseHeader = ({navList}) => {
    const [isButtonClicked, setIsButtonClicked] = React.useState(false);

    const handleButtonClick = () => {
        setIsButtonClicked(prevState => !prevState);
    }

    return (
        <div className={`${styles[`header__wrap`]} ${isButtonClicked ? `${styles[`header__wrap-width`]}` : ""}`}>
            <StickyBox offsetTop={40} offsetBottom={0}>
                <header className={`${styles.header} ${isButtonClicked ? `${styles[`header-width`]}` : ""}`}>
                    <Navigation onButtonClick={handleButtonClick} navList={navList} />
                </header>
            </StickyBox>
        </div>
    )
}

export default BaseHeader;