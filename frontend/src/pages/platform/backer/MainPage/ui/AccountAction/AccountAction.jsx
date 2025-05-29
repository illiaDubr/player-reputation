import React from "react";
import {Link} from "react-router-dom";
import styles from "./AccountAction.module.scss";

const AccountAction = ({title, to, onClick, disabled, imgDecor}) => {
    const content = (
        <>
            <span className={styles[`account__link-title`]}>{title}</span>
            {imgDecor && <img src={imgDecor} alt=""/>}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={`${styles[`account__link-wrap`]} ${disabled && styles[`account__link-wrap--disabled`] || ``}`}>
                {content}
            </Link>
        );
    }

    if (onClick) {
        return (
            <button
                className={`${styles[`account__link-wrap`]} ${disabled && styles[`account__link-wrap--disabled`] || ``}`}
                type="button"
                onClick={onClick}
                disabled={disabled}
            >
                {content}
            </button>
        );
    }
};

export default React.memo(AccountAction);