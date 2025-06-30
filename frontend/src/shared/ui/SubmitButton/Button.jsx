import React from "react";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";

/**
 * Кастомная кнопка для отправки формы и действий
 *
 * @component
 * @param {object} props
 * @param {React.ReactNode} [props.children="Отправить"] – Контент кнопки (текст или элементы)
 * @param {boolean} [props.isLoading] – Состояние загрузки, если true — отображается "Загрузка..."
 * @param {number} [props.maxWidth] – Максимальная ширина кнопки (в px)
 * @param {'button' | 'submit' | 'reset'} [props.type="submit"] – Тип кнопки
 * @param {function} [props.onClick] – Колбэк при нажатии
 */

const Button = ({
                    children = "Отправить",
                    isLoading,
                    maxWidth,
                    type = "submit",
                    onClick}) => {
    return (
        <button
            type={type}
            className={`${styles.submit}`}
            style={{ maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth }}
            onClick={onClick}
        >
            {isLoading ? "Загрузка..." : children}
        </button>
    )
};

Button.propTypes = {
    children: PropTypes.node,
    isLoading: PropTypes.bool,
    maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(["button", "submit", "reset"]),
    onClick: PropTypes.func
};

Button.defaultProps = {
    children: "Отправить",
    isLoading: false,
    maxWidth: 250,
    type: "submit",
    onClick: undefined
};

export default Button;