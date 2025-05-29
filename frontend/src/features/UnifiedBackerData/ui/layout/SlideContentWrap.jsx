import React from "react";
import styles from "./SlideContentWrap.module.scss";

const SlideContentWrap = ({children, title}) => {
    return (
        <>
            {title && (
                <div className={`${styles[`slide__title`]}`}>
                    {title}
                </div>
            )}
            <div className={`${styles[`slide__content`]}`}>
                {children}
            </div>
        </>
    )
}

export default SlideContentWrap;