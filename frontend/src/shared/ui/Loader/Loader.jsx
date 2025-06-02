import React from "react";
import styles from "./Loader.module.scss";
import {HashLoader} from "react-spinners";

const Loader = ({className}) => {
    return (
        <div className={`${styles.loader__wrap} ${styles[`${className}`]}`}>
            <HashLoader
                size={150}
                speedMultiplier={1.6}
                color="#2750f2"
            />
        </div>
    )
}

export default Loader;