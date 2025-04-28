import React from "react";
import Resize from "./Resize.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import Navigation from "../section/header/Navigation.jsx";

const SectionHeader = () => {
    const [isBtnOpen, setIsBtnOpen] = React.useState(null);

    const toggleBtn = () => setIsBtnOpen((prev) => !prev);

    return (
        <div className="section__header-wrap">
            <Breadcrumbs/>
            <Resize width={801}
                    fallback={
                        <>
                            {/*<div className="section__header-info--wrap">
                                {/*<div className="section__header-info">
                        Вам доступно 5 поисков
                    </div>
                            </div>*/}
                            <div className="burger__menu-wrap">
                            </div>

                            <button className={`header__btn-burger ${isBtnOpen ? "header__btn-burger--open" : ""}`}
                                    type="button" onClick={toggleBtn}>
                                <span className="line top-line"></span>
                                <span className="line bottom-line"></span>
                            </button>

                            <div className={`mobile-menu ${isBtnOpen ? "mobile-menu--open" : ""}`}>
                                <Navigation />
                            </div>
                        </>
                    }
            >

                {/*<div className="section__header-info--wrap">
                    {/*<div className="section__header-info">
                        Вам доступно 5 поисков
                    </div>
                    <button className="section__header-btn">
                        <IconSvg width={24} height={24} id={'arrow'}/>
                    </button>
                </div>*/}
            </Resize>
        </div>
    )
}

export default SectionHeader;