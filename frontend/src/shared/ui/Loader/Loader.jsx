import React from "react";
import styles from "./Loader.module.scss";
import loader from "./assets/image/loader.png"

const Loader = () => {
    return (
        <div className={styles.loader__wrap}>
            <div className={styles.loader}>
                <div className={styles.loader__bur}>
                </div>
                <img src={loader} alt="loader" />
            </div>
        </div>
    )
}

export default Loader;