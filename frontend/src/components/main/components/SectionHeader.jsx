import React from "react";
import Resize from "./Resize.jsx";
import IconSvg from "./IconSvg.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";




const SectionHeader = () => {
    return (
        <div className="section__header-wrap">
            <Breadcrumbs />
            <Resize width={801}
                    fallback={
                        <>
                            <div className="section__header-info--wrap">
                                <div className="section__header-info">
                                    Вам доступно 5 поисков
                                </div>
                            </div>
                            <div className="burger__menu-wrap">
                            </div>
                        </>
                    }>
                <div className="section__header-info--wrap">
                    <div className="section__header-info">
                        Вам доступно 5 поисков
                    </div>
                    <button className="section__header-btn">
                        <IconSvg width={24} height={24} id={'arrow'}/>
                    </button>
                </div>
            </Resize>
        </div>
    )
}

export default SectionHeader;