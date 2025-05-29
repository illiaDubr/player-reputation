import React from "react";
import styles from "./Button.module.scss";

const Button = ({children = "Отправить", isLoading, maxWidth, type = "submit", onClick}) => {
    return (
        <button type={type} className={`${styles.submit}`} style={{maxWidth: `${maxWidth}px`}} onClick={onClick}>
            {isLoading ? "Загрузка..." : children}
        </button>
    )
}

export default Button;