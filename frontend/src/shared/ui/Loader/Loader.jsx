import React from "react";
import styles from "./Loader.module.scss";
import {HashLoader} from "react-spinners";

const Loader = () => {
    return (
        <div className={styles.loader__wrap}>
            <HashLoader
                size={150}
                speedMultiplier={1.6}
                color="#2750f2"
            />
        </div>
    )
}

export default Loader;