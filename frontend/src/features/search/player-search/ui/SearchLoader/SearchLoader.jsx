import React from "react";
import styles from "./SearchLoader.module.scss";
import {PuffLoader} from "react-spinners";

const SearchLoader = () => {
    return (
        <div className={styles[`search__loader-wrap`]}>
            <PuffLoader
                size={150}
                speedMultiplier={1.6}
                color="#2750f2"
            />
        </div>
    )
}

export default SearchLoader;