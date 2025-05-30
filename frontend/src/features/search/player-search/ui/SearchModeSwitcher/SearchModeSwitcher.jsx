import React from 'react';
import styles from "./SearchModeSwitcher.module.scss";

const SearchModeSwitcher = ({checked, setChecked}) => {
    const handleChange = (e) => {
        setChecked(e.target.checked);
    };

    return (
        <div className={`${styles[`search-mode-switcher`]}`}>
            {checked ? "Переключиться на поиск по общей базе" : "Переключиться на записи только своего фонда"}
            <input type="checkbox" id="switch" checked={checked} onChange={handleChange} />
            <label className={`${styles[`search-mode-switcher__label`]}`} htmlFor="switch">
            </label>
        </div>
    )
}

export default SearchModeSwitcher;