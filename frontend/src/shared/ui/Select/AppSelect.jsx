import React from "react";
import "./AppSelect.scss";
import styles from './AppSelect.module.scss'
import Select from "react-select";

const AppSelect = React.forwardRef(({
                                        rawOptions = [],
                                        labelKey = "label",
                                        valueKey = "value",
                                        value,
                                        title,
                                        placeholder = "Выберите...",
                                        defaultValue = null,
                                        onChange,
                                        isSearchable = false,
                                        name,
                                        error,
                                    }, ref) => {
    const options = rawOptions.map(opt => ({
        label: opt[labelKey],
        value: opt[valueKey],
        original: opt,
    }));

    const selected = options.find(opt => opt.value === value) || null;

    const handleChange = (selectedOption) => {
        if (onChange) onChange(selectedOption ? selectedOption.value : null);
    };

    return (
        <div className={`${styles[`select__wrap`]}`}>
            {title &&
                <div className={styles[`select__title`]}>
                    {title}
                    {error && (
                        <div className={styles[`select__error`]}>
                            {typeof error === "string" ? error : error.message}
                        </div>
                    )}
                </div>
            }
            <div className={`${error ? ` ${styles[`select__wrap--error`]}` : ""}`}>
                <Select
                    ref={ref}
                    options={options}
                    value={selected}
                    onChange={handleChange}
                    name={name}
                    placeholder={placeholder}
                    isSearchable={isSearchable}
                    classNamePrefix="app-select"
                    styles={{
                        control: () => ({}),
                        input: () => ({}),
                        indicatorSeparator: () => ({}),
                        dropdownIndicator: () => ({}),
                        valueContainer: () => ({}),
                        singleValue: () => ({}),
                        menu: () => ({}),
                        option: () => ({}),
                        indicatorsContainer: () => ({}),
                        placeholder: () => ({}),
                    }}
                />
            </div>
        </div>
    )
});

export default AppSelect;