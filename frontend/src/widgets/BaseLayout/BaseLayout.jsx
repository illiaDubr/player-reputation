import React from "react";
import styles from "./BaseLayout.module.scss";

const BaseLayout = ({header, footer, children, className}) => {
    return (
        <>
            {header}
            <main className={`${styles.main} ${styles[`${className}`]}`}>
                {children}
            </main>
            {footer}
        </>
    )
}

export default BaseLayout;