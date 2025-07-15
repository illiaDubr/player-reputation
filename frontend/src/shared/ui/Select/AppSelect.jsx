import React from "react";
import "./AppSelect.scss";
import styles from './AppSelect.module.scss'
import Select from "react-select";
import PropTypes from "prop-types";

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
                                        className = '',
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
                    classNamePrefix={className ? `app-select ${className}` : "app-select"}
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

AppSelect.propTypes = {
    rawOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    onChange: PropTypes.func,
    isSearchable: PropTypes.bool,
    name: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

AppSelect.propTypes = {
    rawOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.oneOf([null])
    ]),
    onChange: PropTypes.func,
    isSearchable: PropTypes.bool,
    name: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default AppSelect;