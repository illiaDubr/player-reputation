// AppSelect.jsx
import React, {useState} from "react";
import Select from "react-select";

const AppSelect = ({
                       rawOptions = [],
                       labelKey = "label",
                       valueKey = "value",
                       placeholder = "Выберите...",
                       defaultValue = null,
                       onChange,
                       isSearchable = false,
                   }) => {
    // Преобразуем опции
    const options = rawOptions.map(opt => ({
        label: opt[labelKey],
        value: opt[valueKey],
        original: opt,
    }));

    // Внутреннее состояние
    const [selected, setSelected] = useState(
        defaultValue
            ? options.find(opt => opt.value === defaultValue)
            : null
    );

    // Обработка выбора
    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
        if (onChange) onChange(selectedOption); // или onChange(selectedOption.value)
    };

    return (
        <Select
            options={options}
            value={selected}
            onChange={handleChange}
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
    );
};

export default AppSelect;