import React from "react";
import styles from "./Loader.module.scss";
import {HashLoader} from "react-spinners";

const Loader = ({className, size = 150}) => {
    return (
        <div className={`${styles.loader__wrap} ${styles[`${className}`]}`}>
            <HashLoader
                size={size}
                speedMultiplier={1.6}
                color="#2750f2"
            />
        </div>
    )
}

export default Loader;