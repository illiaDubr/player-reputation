import React from "react";
import styles from "./RecordsWrap.module.scss";

const RecordsWrap = ({children, className}) => {
    return (
        <div className={styles[`info_wrap`]}>
            <div className={`${styles[`info`]} ${styles[`${className}`]}`}>
                {children}
            </div>
        </div>
    )
}

export default RecordsWrap;